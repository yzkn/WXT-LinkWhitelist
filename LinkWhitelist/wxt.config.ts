import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  manifest: {
    permissions: ['storage'],
  },
  modules: ['@wxt-dev/module-vue'],
  runner: {
    binaries: {
      chrome: 'C:/Program Files/chrome-win/chrome.exe',
      firefox: 'C:/Program Files/Mozilla Firefox/firefox.exe',
      edge: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    },
  }
});
