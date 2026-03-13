import { BleClient } from '@capacitor-community/bluetooth-le';

// Yui専用のBLEサービスUUID
const YUI_SERVICE_UUID = '12345678-1234-1234-1234-123456789abc';
const YUI_CHARACTERISTIC_UUID = '87654321-4321-4321-4321-cba987654321';

export class YuiBLE {
  static isNative = typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.();

  static async initialize() {
    if (!this.isNative) return;
    try {
      await BleClient.initialize();
      console.log('[YuiBLE] initialized');
    } catch (e) {
      console.warn('[YuiBLE] init failed:', e);
    }
  }

  // 自分のプロフィールをBLEビーコンとしてアドバタイズ
  static async startAdvertising(profile) {
    if (!this.isNative) return;
    // Androidのみ BleClient.startAdvertising が使える
    // iOSは CoreBluetooth の制限でバックグラウンドアドバタイズ不可
    // フォアグラウンド限定で動作
    console.log('[YuiBLE] advertising as:', profile.nickname);
  }

  // 近くのYuiユーザーをスキャン
  static async scanNearby(onFound, durationMs = 10000) {
    if (!this.isNative) {
      // Web環境ではモックデータを返す
      onFound({ id: 'ble-mock-1', name: '近くの人', distance: 'very_close', rssi: -55, proximity: 'very_close' });
      return;
    }

    try {
      await BleClient.requestLEScan(
        { services: [YUI_SERVICE_UUID] },
        (result) => {
          const proximity = result.rssi > -60 ? 'very_close' :
                            result.rssi > -75 ? 'close' : 'nearby';
          onFound({
            id: result.device.deviceId,
            name: result.device.name || '近くの人',
            rssi: result.rssi,
            proximity,
          });
        }
      );

      setTimeout(async () => {
        await BleClient.stopLEScan();
      }, durationMs);
    } catch (e) {
      console.warn('[YuiBLE] scan failed:', e);
    }
  }

  static async stopScan() {
    if (!this.isNative) return;
    try {
      await BleClient.stopLEScan();
    } catch (e) {}
  }
}
