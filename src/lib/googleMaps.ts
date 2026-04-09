import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

const apiKey = typeof import.meta !== 'undefined' && (import.meta as any).env ? (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY : undefined;

if (apiKey) {
  setOptions({
    key: apiKey,
    version: "weekly",
  } as any);
}

export async function getGoogleMaps() {
  if (!apiKey) return null;
  try {
    // We import the core maps library to get the 'google' object
    await importLibrary('maps');
    // We also need places
    await importLibrary('places');
    return (window as any).google;
  } catch (error) {
    console.error('Error loading Google Maps:', error);
    return null;
  }
}
