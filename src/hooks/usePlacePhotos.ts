import { useState, useEffect } from 'react';
import { getGoogleMaps } from '../lib/googleMaps';

const photoCache: Record<string, string[]> = {};

const PLACE_ID_CACHE_KEY = 'sjds-place-id-cache';

interface CacheData {
  placeId: string;
  timestamp: number;
}

export function usePlacePhotos(query: string, name: string, enabled: boolean = false) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || !enabled) {
      setPhotos([]);
      return;
    }

    if (photoCache[query]) {
      setPhotos(photoCache[query]);
      return;
    }

    let isMounted = true;

    async function fetchPhotos() {
      try {
        const google = await getGoogleMaps();
        if (!google || !isMounted) return;

        if (!google.maps || !google.maps.places) {
          console.error('Google Maps Places library not loaded');
          if (isMounted) setLoading(false);
          return;
        }

        setLoading(true);
        const dummyElement = document.createElement('div');
        const service = new google.maps.places.PlacesService(dummyElement);

        // Try to get Place ID from localStorage cache first
        const localCacheRaw = localStorage.getItem(PLACE_ID_CACHE_KEY);
        const localCache: Record<string, CacheData> = localCacheRaw ? JSON.parse(localCacheRaw) : {};
        
        const cachedEntry = localCache[query];
        const placeId = cachedEntry?.placeId;

        const getDetails = (pid: string) => {
          service.getDetails(
            {
              placeId: pid,
              fields: ['photos'],
            },
            (place, detailStatus) => {
              if (detailStatus === google.maps.places.PlacesServiceStatus.OK && place && place.photos) {
                const photoUrls = place.photos.map(photo => 
                  photo.getUrl({ maxWidth: 1200, maxHeight: 800 })
                );
                if (isMounted) {
                  photoCache[query] = photoUrls;
                  setPhotos(photoUrls);
                }
              }
              if (isMounted) setLoading(false);
            }
          );
        };

        if (placeId) {
          getDetails(placeId);
        } else {
          // Only call findPlaceFromQuery if we don't have a cached Place ID
          service.findPlaceFromQuery(
            {
              query: `${name} ${query}`,
              fields: ['place_id'],
            },
            (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0] && results[0].place_id) {
                const newPlaceId = results[0].place_id;
                
                // Save to localStorage cache
                localCache[query] = { placeId: newPlaceId, timestamp: Date.now() };
                localStorage.setItem(PLACE_ID_CACHE_KEY, JSON.stringify(localCache));

                getDetails(newPlaceId);
              } else {
                if (isMounted) setLoading(false);
              }
            }
          );
        }
      } catch (error) {
        console.error('Error fetching Google Place photos:', error);
        if (isMounted) setLoading(false);
      }
    }

    fetchPhotos();

    return () => {
      isMounted = false;
    };
  }, [query, name, enabled]);

  return { photos, loading };
}
