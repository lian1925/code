import siteData = require("src/public/generate/index.json");
import * as fs from "fs";
import summaryData = require("src/public/generate/summary.json");

/**
 *
 *
 * @export 过滤出文章列表
 * @param {*} obj
 * @param {string} [text="tech"]
 * @returns {*}
 */
export function filterPost(obj: any, text = "tech"): any {
  let list: any = [];
  Object.keys(obj).map(item => {
    if (item.indexOf(text) > -1) {
      let result = obj[item];
      result.postId = item;
      list.push(result);
    }
  });
  return list;
}

/**
 *
 *
 * @export 网站基本信息
 * @returns {BaseInfo} 网站标题，副标题，版权拥有者
 */
export function siteBaseInfo(): BaseInfo {
  let result: BaseInfo = {
    title: siteData.siteTitle,
    description: siteData.description,
    copyright: siteData.copyright,
    expire: siteData.expire
  };
  return result;
}

/**
 *
 *
 * @export 首页文章列表
 * @param {Page} page 每页数量，当前页码
 * @returns {IndexPost} 总数,文章列表{文章 ID，标题，标签，创建时间，预览内容}
 */
export function postList(page: Page): IndexPostList {
  let properList = filterPost(summaryData.fileMap);
  let total = properList.length;
  let postList = properList
    .map((item: any) => {
      return {
        postId: item.postId,
        title: item.title,
        tags: item.tags,
        createAt: item.createAt,
        preview: item.preview
      };
    })
    .filter((item: any, index: number) => {
      let min = page.pageNo * page.pageSize - page.pageSize;
      let max = page.pageNo * page.pageSize;
      if (index + 1 > min && index + 1 <= max) {
        return true;
      } else {
        return false;
      }
    });
  let result: IndexPostList = {
    total,
    postList,
    pageNo: page.pageNo,
    pageSize: page.pageSize
  };

  return result;
}

/**
 *
 *
 * @export 文章详情
 * @param {string} postId
 * @returns 文章 ID，标题，标签，创建时间，修改时间，预览内容，完整内容
 */
export function postDetail(postId: string) {
  let detail = require(`src/${postId.slice(6)}`);

  let result: PostDetail = {
    postId,
    title: detail.title,
    tags: detail.tags,
    createAt: detail.createAt,
    updateAt: detail.updateAt,
    preview: detail.preview,
    content: detail.content
  };
  return result;
  // import detail from temp;
  console.log("detail", detail);
}
