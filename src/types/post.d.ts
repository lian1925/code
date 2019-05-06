type Iperson = {
  name: string;
  age: number;
};
interface PostList {
  title: string;
  createAt: string;
  tags?: string;
  preview?: string;
}

type BaseInfo = {
  title: string;
  description: string;
  copyright: string;
  expire: string;
};

type Page = {
  pageSize: number;
  pageNo: number;
};

type IndexPostList = {
  total: number;
  pageSize: number;
  pageNo: number;
  postList: {
    postId: string;
    title: string;
    tags: string[] | string;
    createAt: string;
    preview: string;
  }[];
};

type PostDetail = {
  postId: string;
  title: string;
  tags: string | string[];
  createAt: string;
  updateAt: string;
  preview: string;
  content: string;
};
