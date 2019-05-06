---
title: 数据服务层(实验性)
createAt: 2019-5-17 10:07:10
updateAt: 2019-5-17 10:07:11
tags: 前端
author: lian
---

# 简介

何为网站？前端获取数据，加以恰当样式，呈现于用户，如此构成网站之雏形。

然而前端渲染层获取数据，不宜直接取之于数据源。  
数据源数据多且杂，宜增加一服务层，接管数据之增删改查，对外提供抽象一致接口。

<!-- more -->

# 相关接口

服务层提供接口，分类归总如下

## 首页

1、网站基本信息  
函数：siteBaseInfo  
入参：none  
出参：title,description,copyright(网站标题，副标题，版权拥有者)

2、文章列表  
函数：postList  
入参：pageSize,pageNo(每页数量，当前页码)  
出参：total,pageSize,pageNo,postList{postId,title,tags,createAt,preview}  
(总数,文章列表{文章 ID，标题，标签，创建时间，预览内容})

3、搜索文章  
函数：postSearch  
入参：keyword  
出参：total,postList{title,content,postId}

## 文章页

1、文章详情  
函数：postDetail  
入参：postId  
出参：postId,title,tags,createAt,updateAt,preview,content  
(文章 ID，标题，标签，创建时间，修改时间，预览内容，完整内容)

## 归档页

1、归档文章列表  
函数：postArchive  
入参：pageSize,pageNo,type=year  
出参：total,pageSize,pageNo,[year]:{createAt,title}  
(总数，年份{创建时间，标题})

## 分类页

1、分类列表  
函数：postCategory  
入参：none  
出参：total,categoryList{title,count}  
(总数，分类列表{题目，数量})

2、分类详情  
函数：postDetailCategory  
入参：pageSize,pageNo,category  
出参：total,title,postList{createAt,title}

## 关于页

## 招聘页

(待续)
