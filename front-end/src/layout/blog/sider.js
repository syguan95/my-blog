import { useEffect, useState } from "react";
import { connect } from "react-redux";
import style from "./style.module.scss";
import { personalInfo } from "../../config";
import { message } from "antd";
import API from "../../utils/api";
import myAxios from "../../utils/request";
import { useHistory } from "react-router";

const BlogSider = (props) => {

  const [categoryList, setCategoryList] = useState([]);

  const history = useHistory();

  useEffect(async () => {
    try {
      var data = await myAxios.get(API.GET_ARTICLE_CATEGORYS);
      setCategoryList([...data.categorys])
    } catch (error) {
      message.error(error.message)
    }
  }, [])

  const onCategoryClicked = (category) => {
    history.push(`/blog/articleList/${category}`)
  }

  return (
    <div className={style.blogSiderWrapper}>
      <div className={style.personalInfo}>
        <img className={style.avatar} src={personalInfo.avatar} />
        <div className={style.name}>{personalInfo.name}</div>
        <div className={style.introduction}><span>简介：</span><span>{personalInfo.introduction}</span></div>
        <div className={style.github}><span>GitHub：</span><a href={personalInfo.githubAdd}>{personalInfo.githubName}</a></div>
      </div>
      <div className={style.categoryList}>
        {
          categoryList.map((category, index) => {
            return (
              <div className={style.categoryItem} key={index}>
                <div onClick={() => onCategoryClicked(category.categoryname)}>{category.categoryname}</div><div>{category.count}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default BlogSider;