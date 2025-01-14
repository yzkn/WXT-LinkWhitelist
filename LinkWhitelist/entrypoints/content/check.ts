export const REGEX_WHITELIST_HREF_URLS = [
    /^https?:\/\/[a-z]+\.google\.co(m|\.jp)\/?/,
    /^https?:\/\/[a-z]+\.qiita\.com\/?/,
    /^\//ig,

    'mailto:',
];




// URLを置換
const mask = (str: string) => {
    return get_hostname(str);
    // return remove_query(str);
};


// ホスト名まで抽出
const get_hostname = (str: string) => {
    if (str) {
        if (str.indexOf('http') == 0) {
            try {
                const url = new URL(str);
                return url.origin;
                // return url.protocol + '//' + '<span style="color: #f00;">' + url.hostname + '</span>###' + url.pathname + url.search + url.hash;
            } catch (e) {
                console.error({ e });
            }
        }
    }
    return '';
};


// クエリ文字列を削除
const remove_query = (str: string) => {
    return str ? str.replace(/[\?#].+$/gi, '') : '';
};


// ページ内のすべてのリンクを確認
export const checkLinkTags = (ALL_WHITELIST_HREF_URLS: (string | RegExp)[]) => {
    const linkTags = document.getElementsByTagName('a');
    // console.log({ linkTags })
    Array.prototype.forEach.call(linkTags, function (item) {
        const href_url = item.getAttribute('href');
        const safe_redirect_url = item.getAttribute('data-saferedirecturl');

        console.info('checkLinkTags()', window.location.href, href_url, safe_redirect_url);

        if (href_url) {
            const href_pathname = href_url.indexOf('http') == 0 ? (new URL(href_url)).pathname : '';
            const href_search = href_url.indexOf('http') == 0 ? (new URL(href_url)).search : '';
            const href_hash = href_url.indexOf('http') == 0 ? (new URL(href_url)).hash : '';
            const href_origin = href_url.indexOf('http') == 0 ? (new URL(href_url)).origin : '';
            if (window.location.origin == href_origin) {
                // オリジンが同一ならスキップ
            } else if ((href_pathname == '' || href_pathname == '/') && (href_search == '' || href_search == '?') && (href_hash == '' || href_hash == '#')) {
                // ルートならスキップ
                // console.info('skipped', window.location, href_url, href_pathname);
            } else {
                // } else if (href_url.indexOf('?') > -1) {
                // リンク先URLの判定
                let flag_white_href = false;
                ALL_WHITELIST_HREF_URLS.some(function (wh_url) {
                    if (href_url.search(wh_url) > -1) {
                        // console.info('skipped', window.location, href_url, wh_url);
                        flag_white_href = true;
                        return true;
                    }
                });

                if (flag_white_href) {
                    // console.info('flag_white_href', window.location, href_url);
                } else {
                    // console.info('!flag_white_href', window.location, href_url);

                    // aタグをテキストエリアに置換
                    let inputElement = document.createElement('textarea');
                    inputElement.value = mask(href_url) + '\n' + href_url;
                    inputElement.style.width = (mask(href_url).length * 10) + 'px';
                    inputElement.style.height = '36px';
                    item.replaceWith(inputElement);

                    // console.info("replaced", window.location, href_url, mask(href_url), safe_redirect_url, mask(safe_redirect_url));
                }
            }
        }
    });
}
