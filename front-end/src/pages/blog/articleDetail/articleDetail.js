import { useState, useEffect } from "react";
import { EyeOutlined } from "@ant-design/icons";
import style from "./articleDetail.module.scss";
import { Tag, message } from "antd";
import { personalInfo, categoryColor, tagColor } from "../../../config";
import CommentList from "../commentList/commentList";
import myAxios from "../../../utils/request";
import API from "../../../utils/api";
import moment from "moment";

const ArticleDetail = (props) => {

  const [detail, setDetail] = useState(null)

  useEffect(async () => {
    try {
      //获取文章详情
      var articleDetail = await myAxios.get(API.GET_ARTICLE_DETAIL, { articleId: props.match.params.id });
      setDetail(articleDetail);
    } catch (error) {
      message.error(error.message)
    }
  }, [])

  return (
    <div className={style.articleDetailWrapper}>
      {
        detail &&
        <div className={style.articleDetail}>
          <div className={style.articleHeader}>
            <img src={personalInfo.avatar} />
            <div className={style.articleInfo}>
              <div className={style.name}>{personalInfo.name}</div>
              <div className={style.baseInfo}>
                <div className={style.updateTime}>{moment(detail.updatedAt).format("YYYY-MM-DD")}</div>
                <div className={style.count}><EyeOutlined /><span>{detail.viewCount}</span></div>
              </div>
            </div>
          </div>
          <div className={style.articleTitle}>{detail.title}</div>
          <div className={style.articleContent}>{detail.content}</div>
          <div className={style.articleFooter}>
            <div className={style.articleCategory}>
              <div>文章分类</div>
              <div>
                {
                  detail.categorys.map((category, index) => {
                    return <Tag key={index} color={categoryColor}>{category}</Tag>
                  })
                }
              </div>
            </div>
            <div className={style.articleTag}>
              <div>文章标签</div>
              <div>
                {
                  detail.tags.map((tag, index) => {
                    return <Tag key={index} color={tagColor[index % tagColor.length]}>{tag}</Tag>
                  })
                }
              </div>
            </div>
          </div>
          <div>
            <CommentList articleId={detail.id} />
          </div>
        </div>
      }
    </div >
  )
}

export default ArticleDetail