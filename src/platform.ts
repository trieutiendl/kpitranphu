import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

export async function saveAndShare(name: string, base64: string, mimeType: string): Promise<void> {
  if (!Capacitor.isNativePlatform()) throw new Error('Lưu/chia sẻ tệp cần chạy trong ứng dụng Android hoặc iOS.');
  const result = await Filesystem.writeFile({ path: name, data: base64, directory: Directory.Cache, recursive: true });
  await Share.share({ title: 'Kết quả Chuyển Tệp', text: name, url: result.uri, dialogTitle: 'Lưu hoặc chia sẻ tệp' });
}

export function apiUrl(): string | undefined { return import.meta.env.VITE_CONVERTER_API_URL; }
