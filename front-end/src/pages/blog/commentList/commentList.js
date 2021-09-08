import react, { useState, useEffect } from "react";
import moment from "moment";
import style from "./commentList.module.scss";
import myAxios from "../../../utils/request";
import API from "../../../utils/api";
import Comment from "../comment/comment";
import { Pagination, message, Input, Button } from "antd";
import { connect } from "react-redux";

const { TextArea } = Input;

const pageSize = 10;

const CommentList = (props) => {

  const [commentList, setCommentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentCount, setCommentCount] = useState(0);
  const [newContent, setNewComment] = useState("");

  useEffect(() => {
    getCommentByPageNO(currentPage)
  }, [currentPage])

  const getCommentByPageNO = async (page) => {
    try {
      let query = {
        articleId: props.articleId,
        currentPage: page
      }
      let commentData = await myAxios.get(API.GET_COMMENT_LIST, query);
      setCommentList(commentData.commentList);
      setCurrentPage(commentData.currentPage);
      setCommentCount(commentData.totalElements);
    } catch (error) {
      message.error(error.message)
    }
  }

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  const onCommentChanged = (e) => {
    setNewComment(e.target.value)
  }

  const addComment = async () => {
    if (props.userId < 0) {
      message.error("请登录后再评论")
      return
    }
    let body = {
      userId: props.userId,
      articleId: props.articleId,
      content: newContent,
    }
    try {
      await myAxios.post(API.CREATE_COMMENT, body);
      message.success("评论发表成功")
      setNewComment("")
      updateCommentList()
    } catch (error) {
      message.error(error.message)
    }
  }

  const updateCommentList = () => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    } else {
      getCommentByPageNO(1)
    }
  }

  return (
    <div className={style.commentListWrapper}>
      <div className={style.addCommentContainer}>
        <TextArea rows={4} allowClear={true} placeholder="输入评论" onChange={onCommentChanged} value={newContent} />
        <div className={style.addCommentButton}>
          <Button type="primary" disabled={newContent.length <= 0} onClick={addComment}>发表评论</Button>
        </div>
      </div>
      <div className={style.commentListHeader}>{`全部评论(${commentCount})`}</div>
      <div className={style.commentListBody}>
        {
          commentList.map((comment, index) => {
            return (
              <div key={comment.id}>
                <Comment comment={comment} afterCommentDelete={updateCommentList} />
              </div>
            )
          })
        }
      </div>
      {
        commentCount > 0 &&
        <div className={style.commentListPagination}>
          <Pagination size="small" current={currentPage} pageSize={pageSize} total={commentCount} onChange={onPageChange} />
        </div>
      }
    </div>
  )
}

export default connect((state) => {
  return {
    userId: state.user.userId,
  }
})(CommentList);