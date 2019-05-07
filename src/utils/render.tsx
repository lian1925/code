// 格式渲染相关

import MarkdownIt = require("markdown-it");
import hljs = require("highlight.js"); // https://highlightjs.org/
import "highlight.js/styles/mono-blue.css";

const md: any = new MarkdownIt({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  }
});

/**
 *
 *
 * @export 将字符串渲染成html格式
 * @param {string} str
 * @returns
 */
export function renderWithMarkdown(str: string) {
  return md.render(str);
}
