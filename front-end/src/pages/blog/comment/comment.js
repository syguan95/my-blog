import react, { useState, useEffect } from "react";
import moment from "moment";
import style from "./comment.module.scss";
import { Modal, message, Input, Button } from "antd";
import { CommentOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import ReplyList from "../replyList/replyList";
import { connect } from "react-redux";
import myAxios from "../../../utils/request";
import API from "../../../utils/api";

const { confirm } = Modal;
const { TextArea } = Input

const Comment = (props) => {

  const { id, userId, username, time, content } = props.comment;

  const [replyCounts, setReplyCounts] = useState(0);
  const [isAddReplyShow, setIsAddReplyShow] = useState(false);
  const [newReply, setNewReply] = useState("")
  const [updateFlag, setUpdateFlag] = useState(1);

  const onReplyListChanged = (count) => {
    setReplyCounts(count);
  }

  const deleteComment = () => {
    confirm({
      title: '确认删除该评论吗?',
      icon: <ExclamationCircleOutlined />,
      content: '删除该评论后，评论相关的回复也将被删除。',
      okText: '确认',
      async onOk() {
        try {
          await myAxios.delete(API.DELETE_COMMENT, { commentId: id })
          message.success("评论删除成功")
          props.afterCommentDelete()
        } catch (error) {
          message.error(error.message)
        }
      },
      cancelText: "取消",
      onCancel() {
        console.log('取消删除评论');
      },
    });
  }

  const onAddReplyBtnClicked = () => {
    setIsAddReplyShow(preIsShow => !preIsShow)
    setNewReply("");
  }

  const onNewReplyChanged = (e) => {
    setNewReply(e.target.value)
  }

  const addReply = async () => {
    if (props.userId <= 0) {
      message.error("请先登录后回复")
      return
    }
    let body = {
      content: newReply,
      commentId: id,
      toUserId: userId,
      fromUserId: props.userId,
    }
    try {
      await myAxios.post(API.CREATE_REPLY, body)
      message.success("回复成功")
      setIsAddReplyShow(false)
      setNewReply("")
      setUpdateFlag(preFlag => -preFlag)
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <div className={style.commentWrapper}>
      <div className={style.commentHead}>
        <span>{username}</span>
        <span>{moment(time).format("YYYY-MM-DD")}</span>
      </div>
      <div className={style.commentContent}>{content}</div>
      <div className={style.commentOperation}>
        <div onClick={onAddReplyBtnClicked}><CommentOutlined style={{ "color": "#86909c" }} /><span>{isAddReplyShow ? "取消回复" : (replyCounts > 0 ? replyCounts : "回复")}</span></div>
        {
          userId === props.userId &&
          <div onClick={deleteComment}><DeleteOutlined style={{ "color": "#86909c" }} /><span>删除</span></div>
        }
      </div>
      {
        isAddReplyShow &&
        <div className={style.newReplyContainer}>
          <TextArea autoSize value={newReply} onChange={onNewReplyChanged} allowClear placeholder={"回复" + username + "..."} />
          <div>
            <Button type="primary" onClick={addReply} disabled={newReply.length <= 0}>发表回复</Button>
          </div>
        </div>
      }
      <div className={style.commentReply}>
        <ReplyList commentId={id} onReplyListChanged={onReplyListChanged} updateFlag={updateFlag} />
      </div>
    </div>
  )
}

export default connect((state) => {
  return {
    userId: state.user.userId,
  }
})(Comment);