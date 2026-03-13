import { Geolocation } from '@capacitor/geolocation';

export class YuiLocation {
  static isNative = typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.();

  static async getCurrentPosition() {
    if (this.isNative) {
      try {
        const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
        return { lat: pos.coords.latitude, lng: pos.coords.longitude };
      } catch (e) {
        console.warn('[YuiLocation] failed:', e);
        return null;
      }
    } else {
      // Web fallback
      return new Promise((resolve) => {
        navigator.geolocation?.getCurrentPosition(
          (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
          () => resolve(null)
        );
      });
    }
  }
}
