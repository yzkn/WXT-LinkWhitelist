import { storage } from "wxt/storage";
import { defineBackground } from "wxt/sandbox";


const defaultWhitelistUrls = `x.com
`;


export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  // インストール時のみ行う処理
  browser.runtime.onInstalled.addListener((details) => {
    // onInstalledイベントは拡張機能を更新したときにも発生するので、インストール時だけに発生させたい場合は以下のように分岐させる
    if (details.reason == "install") {
      storage.defineItem("sync:whitelistUrls", {
        init: () => defaultWhitelistUrls
      })
    }
  });

  // // Modify the storage item in the background to demonstrate that the composable works
  // setInterval(async () => {
  //   const oldValue = await storage.getItem<number>("sync:count");
  //   const newValue = (oldValue ?? 0) + 1;
  //   await storage.setItem("sync:count", newValue);
  // }, 1000);
});
