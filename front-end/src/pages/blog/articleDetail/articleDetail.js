import { useState, useEffect } from "react";
import { EyeOutlined } from "@ant-design/icons";
import style from "./articleDetail.module.scss";
import { Tag } from "antd";
import { personalInfo, categoryColor, tagColor } from "../../../config";

const article = {
  id: 1,
  title: "标题",
  content: "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
  view: 100,
  updatedAt: "2021-08-19",
  categorys: ["分类1", "分类2", "分类3"],
  tags: ["标签1", "标签2", "标签3"]
};

const ArticleDetail = (props) => {
  return (
    <div className={style.articleDetailWrapper}>
      <div className={style.articleDetail}>
        <div className={style.articleHeader}>
          <img src={personalInfo.avatar} />
          <div className={style.articleInfo}>
            <div className={style.name}>{personalInfo.name}</div>
            <div className={style.baseInfo}>
              <div className={style.updateTime}>{article.updatedAt}</div>
              <div className={style.count}><EyeOutlined /><span>{article.view}</span></div>
            </div>
          </div>
        </div>
        <div className={style.articleTitle}>{article.title}</div>
        <div className={style.articleContent}>{article.content}</div>
        <div className={style.articleFooter}>
          <div className={style.articleCategory}>
            <div>文章分类</div>
            <div>
              {
                article.categorys.map((category, index) => {
                  return <Tag key={index} color={categoryColor}>{category}</Tag>
                })
              }
            </div>
          </div>
          <div className={style.articleTag}>
            <div>文章标签</div>
            <div>
              {
                article.tags.map((tag, index) => {
                  return <Tag key={index} color={tagColor[index]}>{tag}</Tag>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ArticleDetail