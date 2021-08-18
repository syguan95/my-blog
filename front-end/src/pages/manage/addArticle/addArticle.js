import { useState, useEffect, useRef } from "react";
import { Form, Button, Input, message, Tag } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import myAxios from "../../../utils/request";
import API from "../../../utils/api";
import style from "./addArticle.module.scss";

const { TextArea } = Input;

const AddArticle = (props) => {

  const [form] = Form.useForm();
  const tagInputRef = useRef();
  const categoryInputRef = useRef();

  const [articleId, setArticleId] = useState(-1);//新增和编辑文章共用一个界面，-1时为新增，>-1时为编辑

  const [tags, setTags] = useState([]);

  const [categorys, setCategorys] = useState([]);

  const [tagInputVisible, setTagInputVisible] = useState(false);
  const [categoryInputVisible, setCategoryInputVisible] = useState(false);
  const [newContent, setNewContent] = useState("");

  useEffect(async () => {
    var id = props.location.state && props.location.state.articleId ? parseInt(props.location.state.articleId) : -1;
    console.log(id)
    setArticleId(id);
    var tags = [], categorys = [];
    try {
      if (id === -1) {
        var tagData = await myAxios.get(API.GET_ARTICLE_TAGS);
        tags = tagData.tags;
        var categoryData = await myAxios.get(API.GET_ARTICLE_CATEGORYS);
        categorys = categoryData.categorys;
      } else {
        var data = await myAxios.get(API.GET_ARTICLE_DETAIL, { articleId: id });
        form.setFieldsValue({
          title: data.title,
          content: data.content,
        })
        tags = data.tags;
        categorys = data.categorys;
      }
      setTags([...tags])
      setCategorys([...categorys])
    } catch (error) {
      message.error(error.message)
    }
  }, [])

  useEffect(() => {
    if (tagInputVisible) {
      tagInputRef.current.focus();
    }
  }, [tagInputVisible])

  useEffect(() => {
    if (categoryInputVisible) {
      categoryInputRef.current.focus();
    }
  }, [categoryInputVisible])

  const onInputShow = (type) => {
    if (type === "tag") {
      setTagInputVisible(true);
    } else if (type === "category") {
      setCategoryInputVisible(true);
    }
    setNewContent("")
  }

  const onChangeNewContent = (event) => {
    setNewContent(event.target.value);
  }

  const onAddTagOrCategory = (type) => {
    if (type === "tag") {
      if (newContent && tags.indexOf(newContent) < 0) {
        setTags([...tags, newContent])
      }
      setTagInputVisible(false);
    } else if (type === "category") {
      if (newContent && categorys.indexOf(newContent) < 0) {
        setCategorys([...categorys, newContent])
      }
      setCategoryInputVisible(false);
    }
    setNewContent("")
  }

  const onDeleteTagOrCategory = (type, removedItem) => {
    if (type === "tag") {
      setTags(tags.filter(tag => tag !== removedItem));
    } else if (type === "category") {
      setCategorys(categorys.filter(category => category !== removedItem));
    }
  };


  const onAddArticle = async () => {
    var data = {
      title: form.getFieldValue("title"),
      content: form.getFieldValue("content"),
      tags: tags,
      categorys: categorys,
    }
    try {
      if (articleId === -1) {
        data.userId = props.userId
        await myAxios.post(API.CREATE_ARTICLE, data)
        message.success("发布成功！")
      } else {
        data.articleId = articleId;
        await myAxios.put(API.UPDATE_ARTICLE, data)
        message.success("更新成功")
      }
      props.history.push("/manage/articleList")
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        autoComplete="off"
        onFinish={onAddArticle}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入文章标题！' }]}
        >
          <Input placeholder="请输入文章标题" maxLength={50} />
        </Form.Item>
        <Form.Item
          label="标签"
        >
          <div className={style.chooseTagContainer}>
            {tags.map(tag => (
              <Tag
                closable
                onClose={e => {
                  e.preventDefault();
                  onDeleteTagOrCategory("tag", tag);
                }}
                key={tag}
              >
                {tag}
              </Tag>
            ))}
            {tagInputVisible && (
              <Input
                ref={tagInputRef}
                type="text"
                size="small"
                maxLength={10}
                style={{ width: 78 }}
                value={newContent}
                onChange={onChangeNewContent}
                onBlur={() => onAddTagOrCategory("tag")}
                onPressEnter={() => onAddTagOrCategory("tag")}
              />
            )}
            {!tagInputVisible && (
              <Tag onClick={() => onInputShow("tag")}>
                <PlusOutlined /> New Tag
              </Tag>
            )}
          </div>
        </Form.Item>
        <Form.Item
          label="类别"
        >
          <div className={style.chooseTagContainer}>
            {categorys.map(category => (
              <Tag
                closable
                onClose={e => {
                  e.preventDefault();
                  onDeleteTagOrCategory("category", category);
                }}
                key={category}
              >
                {category}
              </Tag>
            ))}
            {categoryInputVisible && (
              <Input
                ref={categoryInputRef}
                type="text"
                size="small"
                maxLength={10}
                style={{ width: 78 }}
                value={newContent}
                onChange={onChangeNewContent}
                onBlur={() => onAddTagOrCategory("category")}
                onPressEnter={() => onAddTagOrCategory("category")}
              />
            )}
            {!categoryInputVisible && (
              <Tag onClick={() => onInputShow("category")}>
                <PlusOutlined /> New Category
              </Tag>
            )}
          </div>
        </Form.Item>
        <Form.Item
          label="文章内容"
          name="content"
          rules={[{ required: true, message: '请输入文章内容！' }]}
        >
          <TextArea placeholder="请输入文章内容" showCount={true} autoSize={{ minRows: 10, maxRows: 10 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
        </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default connect((state) => {
  return {
    userId: state.user.userId,
  }
})(AddArticle);