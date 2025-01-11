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

  const observer = new MutationObserver(handleMutations);
  observer.observe(document.body, { childList: true, subtree: true });
};

const handleMutations = async () => {
  console.log('handleMutations()');

  // replaceHref();
};
