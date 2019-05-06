import * as React from "react";
import { Link } from "react-router-dom";
import * as date from "@/utils/date";
import { Pagination } from "antd";
import MarkdownIt = require("markdown-it");
import hljs = require("highlight.js"); // https://highlightjs.org/

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

import "./index.less";
import "highlight.js/styles/mono-blue.css";

export interface ContentProps {
  postDetail: PostDetail;
}

export const Content = (props: ContentProps) => (
  <div className="component-content">
    <div className="inner">
      <div>
        {
          <div className="post">
            <h2 className="post-title">{props.postDetail.title}</h2>

            <div className="post-meta">
              发表于 {date.formatDateTime(props.postDetail.createAt)} | 分类于{" "}
              <Link to="/tag">{props.postDetail.tags}</Link>
            </div>

            <div className="post-body">
              <div
                dangerouslySetInnerHTML={{
                  __html: md.render(props.postDetail.content)
                }}
              />
            </div>
          </div>
        }
      </div>
    </div>
  </div>
);

export default Content;
