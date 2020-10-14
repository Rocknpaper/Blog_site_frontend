import React, { ChangeEvent, useState, useEffect } from "react";
import "./Create.css";
import InputFeild from "../../components/UI/InputFeild/InputFeild";
import Button from "../../components/UI/Button/Button";
import TextBox from "../../components/UI/TextBox/TextBox";
import { useDispatch, useSelector } from "react-redux";
import { Blogs, ReducersType, BlogState, UserState } from "../../models";
import { addPost, editUserPostAsync } from "../../store/actions/blog_actions";
import { useParams, useHistory } from "react-router-dom";
import { redirectUrl } from "../../store/actions/user_actions";

interface ParamType {
  id: string;
}

const Create: React.FC = () => {
  const blogs = useSelector<ReducersType, BlogState>((state) => state.blog);
  const user = useSelector<ReducersType, UserState>((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);

  const { id } = useParams<ParamType>();
  useEffect(() => {
    if (!user.logged) {
      dispatch(redirectUrl("/create-post"))
      history.push("/auth");
    }

    if (id && user.logged) {
      setEdit(true);
      const blog = blogs.blogs.find((data) => data._id?.$oid === id);
      setTitle(blog ? blog.title : "");
      setContent(blog ? blog.content : "");
    }
  }, []);

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const textAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const editSubmitHandler = (event: any) => {
    event.preventDefault();
    dispatch(
      editUserPostAsync(id, title, content, () => {
        history.push("/");
      })
    );
  };

  const SubmitHandler = (event: any) => {
    event.preventDefault();

    const blog: Blogs = {
      title: title,
      content: content,
      upvotes: {
        users: [],
        count: 0,
      },
      downvotes: {
        users: [],
        count: 0,
      },
    };

    dispatch(
      addPost(blog, () => {
        history.push("/");
      })
    );
  };

  return (
    <form className="postForm">
      <InputFeild
        type="text"
        placeHolder="Title"
        value={title}
        onChange={inputChange}
      />
      <TextBox
        placeHolder="Your blog post here"
        value={content}
        onChange={textAreaChange}
      />
      <InputFeild
        type="text"
        placeHolder="Tags"
        value=""
        onChange={(e) => console.log(e)}
      />
      <Button
        text="Submit"
        onClick={edit ? editSubmitHandler : SubmitHandler}
      />
    </form>
  );
};
export default Create;
