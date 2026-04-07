import { useState, useEffect } from 'react';
import { getGoogleMaps } from '../lib/googleMaps';

const photoCache: Record<string, string[]> = {};

export function usePlacePhotos(query: string, name: string) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
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

        service.findPlaceFromQuery(
          {
            query: `${name} ${query}`,
            fields: ['place_id'],
          },
          (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0] && results[0].place_id) {
              const placeId = results[0].place_id;
              
              service.getDetails(
                {
                  placeId: placeId,
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
            } else {
              if (isMounted) setLoading(false);
            }
          }
        );
      } catch (error) {
        console.error('Error fetching Google Place photos:', error);
        if (isMounted) setLoading(false);
      }
    }

    fetchPhotos();

    return () => {
      isMounted = false;
    };
  }, [query, name]);

  return { photos, loading };
}
