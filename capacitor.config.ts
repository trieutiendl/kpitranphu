import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'vn.chuyente p.mobile'.replace(' ', ''),
  appName: 'Chuyển Tệp',
  webDir: 'dist',
  plugins: { StatusBar: { style: 'LIGHT' } }
};

export default config;
