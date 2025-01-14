import { REGEX_WHITELIST_HREF_URLS, checkLinkTags } from './check';

export default defineContentScript({
  matches: [
    '*://*.google.com/*',
    '*://qiita.com/*'
  ],
  async main(ctx) {
    const whitelistUrls = await storage.getItem<number>('sync:whitelistUrls');
    console.log('Hello content.', whitelistUrls);

    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      onMount: handleUiMount,
    });
    ui.mount();
  }
});


const handleUiMount = () => {
  console.log('handleUiMount()');

  // ページの表示が切り替わったタイミングを検知して置換処理を行う
  const observer = new MutationObserver(async (mutations) => {
    if (mutations.length > 10) {
      console.log({ mutations });

      // checkLinkTags()での書き換えが検知されないようにするために一時停止
      observer.disconnect();

      const whitelist_urls = await storage.getItem<number>("sync:whitelistUrls");
      const whitelistUrls = String(whitelist_urls).split('\n').filter(v => v);
      const ALL_WHITELIST_HREF_URLS = REGEX_WHITELIST_HREF_URLS.concat(whitelistUrls);
      checkLinkTags(ALL_WHITELIST_HREF_URLS);

      // 検知再開
      observer.observe(document, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
      });
    }
  });
  observer.observe(document, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
  });
};
