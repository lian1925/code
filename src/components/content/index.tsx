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
  postList: IndexPostList;
  meta?: string;
}

export const Content = (props: ContentProps) => (
  <div className="component-content">
    <div className="inner">
      <div>
        {props.postList.postList.map(item => (
          <div className="post" key={item.title}>
            <Link to={`/post?postId=${item.postId}`}>
              <h2 className="post-title">{item.title}</h2>
            </Link>

            <div className="post-meta">
              发表于 {date.formatDateTime(item.createAt)} | 分类于{" "}
              <Link to="/tag">{item.tags}</Link>
            </div>

            <div className="post-body">
              <div
                dangerouslySetInnerHTML={{ __html: md.render(item.preview) }}
              />
            </div>
          </div>
        ))}
        <div className="pagination">
          <Pagination
            current={props.postList.pageNo}
            total={props.postList.total}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Content;
