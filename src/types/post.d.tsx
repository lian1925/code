// 文章相关

// 网站基本信息接口
interface BaseInfo {
  title: string;
  description: string;
  copyright: string;
  expire: string;
}

// 文章详情接口
interface PostDetail {
  postId: string;
  title: string;
  tags: string | string[];
  createAt: string;
  updateAt: string;
  preview: string;
  content: string;
}

// 文章列表接口
interface PostList {
  postId: string;
  title: string;
  tags: string[] | string;
  createAt: string;
  preview: string;
  searchFragment?: string;
}

// 标签列表接口
interface TagList {
  title: string;
  count: number;
}
