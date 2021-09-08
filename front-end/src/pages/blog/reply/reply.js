import react, { useState, useEffect } from "react";
import style from "./reply.module.scss";
import moment from "moment";
import { CommentOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import myAxios from "../../../utils/request";
import API from "../../../utils/api";
import { message, Input, Button, Modal } from "antd";

const { TextArea } = Input
const { confirm } = Modal

const Reply = (props) => {

  const { reply } = props;

  const [isAddReplyShow, setIsAddReplyShow] = useState(false);
  const [newReply, setNewReply] = useState("")

  const onAddReplyBtnClicked = () => {
    setIsAddReplyShow(preIsShow => !preIsShow)
    setNewReply("")
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
      commentId: reply.commentId,
      toUserId: reply.fromUserId,
      fromUserId: props.userId,
      replyId: reply.id,
    }
    try {
      await myAxios.post(API.CREATE_REPLY, body)
      message.success("回复成功")
      setIsAddReplyShow(false)
      setNewReply("")
      props.afterAddOrDeleteReply()
    } catch (error) {
      message.error(error.message)
    }
  }

  const deleteReply = () => {
    confirm({
      title: '确认删除该回复吗?',
      icon: <ExclamationCircleOutlined />,
      content: '删除该回复后，该回复相关的所有回复也将被删除。',
      okText: '确认',
      async onOk() {
        try {
          await myAxios.delete(API.DELETE_REPLY, { replyId: reply.id });
          message.success("回复删除成功")
          props.afterAddOrDeleteReply()
        } catch (error) {
          message.error(error.message)
        }
      },
      cancelText: "取消",
      onCancel() {
        console.log('取消删除回复');
      },
    });
  }

  return (
    <div className={style.replyWrapper}>
      <div className={style.replyHead}>
        <span>{reply.fromUsername}</span>
        <span>回复</span>
        <span>{reply.toUsername}</span>
        <span>{moment(reply.time).format("YYYY-MM-DD")}</span>
      </div>
      <div className={style.replyContent}>{reply.content}</div>
      {
        reply.refReplyId && //是否为回复的回复
        <div className={style.refReply}>{reply.refReplyContent}</div>
      }
      <div className={style.replyOperation}>
        <div onClick={onAddReplyBtnClicked}><CommentOutlined style={{ "color": "#86909c" }} /><span>{isAddReplyShow ? "取消回复" : "回复"}</span></div>
        {
          reply.fromUserId === props.userId &&
          <div onClick={deleteReply}><DeleteOutlined style={{ "color": "#86909c" }} /><span>删除</span></div>
        }
      </div>
      {
        isAddReplyShow &&
        <div className={style.newReplyContainer}>
          <TextArea autoSize value={newReply} onChange={onNewReplyChanged} allowClear placeholder={"回复" + reply.fromUsername + "..."} />
          <div>
            <Button type="primary" onClick={addReply} disabled={newReply.length <= 0}>发表回复</Button>
          </div>
        </div>
      }
    </div>
  )
}

export default connect((state) => {
  return {
    userId: state.user.userId,
  }
})(Reply)