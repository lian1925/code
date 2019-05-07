import siteData = require("src/public/generate/index.json");
import summaryData = require("src/public/generate/summary.json");

import * as utils from "src/utils";
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
export function homePostList(pageSize: number, pageNo: number) {
  // 1 过滤满足条件的列表
  let properList = filterPost(summaryData.fileMap);
  let total: number = properList.length;

  // 2 提取所需字段
  let postList: PostList[] = properList.map((item: any) => {
    return {
      postId: item.postId,
      title: item.title,
      tags: item.tags,
      createAt: item.createAt,
      preview: item.preview
    };
  });

  // 3 按时间倒序排序
  postList = postList.sort(
    (a: any, b: any) =>
      (new Date(b.createAt) as any) - (new Date(a.createAt) as any)
  );

  // 4 按页码过滤数据
  postList = postList.filter((item: any, index: number) => {
    let min = pageNo * pageSize - pageSize;
    let max = pageNo * pageSize;
    if (index + 1 > min && index + 1 <= max) {
      return true;
    } else {
      return false;
    }
  });

  // 5 返回结果
  let result = {
    postList,
    total,
    pageNo: pageNo,
    pageSize: pageSize
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
}

/**
 *
 *
 * @export 搜索文章
 * @param {string} keyword
 * @param {number} [pageSize=10]
 * @param {number} [pageNo=1]
 * @returns
 */
export function searchPostList(
  keyword: string,
  pageSize: number = 10,
  pageNo: number = 1,
  fragmentSize: number = 20
) {
  // 1 过滤满足条件的列表
  let properList = filterPost(summaryData.fileMap);

  // 2 提取所需字段
  let postList: PostList[] = properList.map((item: any) => {
    return {
      postId: item.postId,
      title: item.title,
      tags: item.tags,
      createAt: item.createAt,
      preview: item.preview
    };
  });

  // 3 按时间倒序排序
  postList = postList.sort(
    (a: any, b: any) =>
      (new Date(b.createAt) as any) - (new Date(a.createAt) as any)
  );

  // 4 筛选满足添加列表
  postList = postList.filter(item => {
    let isMatch = false;
    if (item.title.includes(keyword)) {
      // 判断标题是否包含关键字
      isMatch = true;
    } else if (item.preview.includes(keyword)) {
      // 判断正文是否包含关键字
      isMatch = true;
    }
    return isMatch;
  });

  // 5 统计总数
  let total: number = postList.length;

  // 6 按页码过滤数据
  postList = postList.filter((item: any, index: number) => {
    let min = pageNo * pageSize - pageSize;
    let max = pageNo * pageSize;
    if (index + 1 > min && index + 1 <= max) {
      return true;
    } else {
      return false;
    }
  });

  // 7 添加包含关键字的片段
  postList = postList.map(item => {
    let searchFragment = "";
    if (item.title.includes(keyword)) {
      // 判断标题是否包含关键字
      searchFragment = item.title;
    } else if (item.preview.includes(keyword)) {
      // 判断正文是否包含关键字
      let position = item.preview.indexOf(keyword);
      let padding = (fragmentSize - keyword.length) / 2;
      let start = position - padding;
      let end = start + fragmentSize;
      start = start > 0 ? start : 0;
      end = end < item.preview.length ? end : item.preview.length;
      searchFragment = item.preview.slice(start, end);
    }
    let result = { ...item, searchFragment };
    return result;
  });

  return {
    total,
    pageSize,
    pageNo,
    keyword,
    postList
  };
}

/**
 *
 *
 * @export 归档文章列表
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {string} [type="year"]
 * @returns
 */
export function archivePostList(
  pageSize: number,
  pageNo: number,
  type: string = utils.constants.YEAR
) {
  // 1 过滤满足条件的列表
  let properList = filterPost(summaryData.fileMap);
  let total: number = properList.length;

  // 2 提取所需字段
  let postList: PostList[] = properList.map((item: any) => {
    return {
      postId: item.postId,
      title: item.title,
      tags: item.tags,
      createAt: item.createAt,
      preview: item.preview
    };
  });

  // 3 按时间倒序排序
  postList = postList.sort(
    (a: any, b: any) =>
      (new Date(b.createAt) as any) - (new Date(a.createAt) as any)
  );

  // 4 按页码过滤数据
  postList = postList.filter((item: any, index: number) => {
    let min = pageNo * pageSize - pageSize;
    let max = pageNo * pageSize;
    if (index + 1 > min && index + 1 <= max) {
      return true;
    } else {
      return false;
    }
  });

  // 5 按时间归档
  let data: any = {};
  postList.map((item: any) => {
    let date = new Date(item.createAt);
    let year = date.getFullYear();
    let month = year + utils.prefixNumber(date.getMonth());
    if (type === utils.constants.MONTH) {
      data[month] = data[month] ? data[month] : [];
      data[month].push(item);
    } else {
      data[year] = data[year] ? data[year] : [];
      data[year].push(item);
    }
  });

  // 6 返回结果
  return {
    data,
    total,
    pageNo: pageNo,
    pageSize: pageSize
  };
}

/**
 *
 *
 * @export 分类列表
 * @param {string} [type="tag"]
 * @returns
 */
export function tagList(type: string = utils.constants.TAG) {
  // 1 过滤满足条件的列表
  let properList = filterPost(summaryData.fileMap);

  // 2 提取所需字段
  let postList: PostList[] = properList.map((item: any) => {
    return {
      postId: item.postId,
      title: item.title,
      tags: item.tags,
      createAt: item.createAt,
      preview: item.preview
    };
  });

  // 3 按标签归类文章
  let data: any = {};
  if (type === utils.constants.TAG) {
    postList.map(item => {
      if (typeof item.tags === "string") {
        data[item.tags] = data[item.tags] ? data[item.tags] : [];
        data[item.tags].push(item);
      } else {
        item.tags.map(tag => {
          data[tag] = data[tag] ? data[tag] : [];
          data[tag].push(item);
        });
      }
    });
  }

  // 4 归总标签
  let tagList: TagList[] = [];
  let total: number = Object.keys(data).length;
  tagList = Object.keys(data).map(item => {
    return {
      title: item,
      count: data[item].length
    };
  });

  // 5 返回结果
  return {
    total,
    type,
    tagList
  };
}

/**
 *
 *
 * @export 分类| 标签 详情
 * @param {string} name
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {*} [type=utils.constants.TAG]
 * @returns
 */
export function tagPostList(
  name: string,
  pageSize: number,
  pageNo: number,
  type = utils.constants.TAG
) {
  // 1 过滤满足条件的列表
  let properList = filterPost(summaryData.fileMap);

  // 2 提取所需字段
  let postList: PostList[] = properList.map((item: any) => {
    return {
      postId: item.postId,
      title: item.title,
      tags: item.tags,
      createAt: item.createAt,
      preview: item.preview
    };
  });

  // 3 按标签归类文章
  let data: any = {};
  if (type === utils.constants.TAG) {
    postList.map(item => {
      if (typeof item.tags === "string") {
        data[item.tags] = data[item.tags] ? data[item.tags] : [];
        data[item.tags].push(item);
      } else {
        item.tags.map(tag => {
          data[tag] = data[tag] ? data[tag] : [];
          data[tag].push(item);
        });
      }
    });
  }

  // 4 统计总数
  postList = data[name];
  let total = postList.length;

  // 5 按页码过滤数据
  postList = postList.filter((item: any, index: number) => {
    let min = pageNo * pageSize - pageSize;
    let max = pageNo * pageSize;
    if (index + 1 > min && index + 1 <= max) {
      return true;
    } else {
      return false;
    }
  });

  return {
    total,
    pageSize,
    pageNo,
    type,
    name,
    postList
  };
}

/**
 *
 * 过滤出文章列表
 * @param {*} obj
 * @param {string} [text="tech"]
 * @returns {*}
 */
function filterPost(obj: any, text: string = "tech"): any {
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
