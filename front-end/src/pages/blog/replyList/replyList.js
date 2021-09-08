import react, { useState, useEffect } from "react";
import style from "./replyList.module.scss";
import moment from "moment";
import Reply from "../reply/reply";
import myAxios from "../../../utils/request";
import API from "../../../utils/api";
import { message } from "antd";

const ReplyList = (props) => {

  const [replyList, setReplyList] = useState([])

  useEffect(async () => {
    getReplyList()
  }, [props.updateFlag])

  const getReplyList = async () => {
    try {
      var replyData = await myAxios.get(API.GET_REPLY_LIST, { commentId: props.commentId });
      setReplyList(replyData.replyList)
      props.onReplyListChanged(replyData.replyList.length)
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <div className={style.replyListWrapper}>
      <div className={style.replyListBody}>
        {
          replyList.map((reply, index) => {
            return (
              <div className={style.replyItem} key={reply.id}>
                <Reply reply={reply} afterAddOrDeleteReply={getReplyList} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ReplyList