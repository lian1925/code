# 简介

使用 typescript 编写一个包含 webpack 打包，单元测试，可持续集成的 JavaScript 库。

编写的 JavaScript 库取名为 parsemarkdown，将会实现如下功能：  
1、解析指定目录下的 markdown 文件  
2、生成约定格式的目标文件，放置于指定目录  
3、监听文件变动，实现自动编译与增量编译

# 相关知识点

1、nodeJs 的 fs 模块

```bash
1、 fs.stat 检测是文件还是目录
2、fs.mkdir 创建目录
3、fs.writeFile 写入文件
4、fs.appendFile 写入追加内容
5、fs.readFile 读取文件
6、fs.readdir 读取目录
7、fs.rename 重命名文件或目录
8、fs.rmdir 删除目录
9、fs.unlink 删除文件
```

2、node-glob
通过指定规则，匹配对应文件。

# 实践
