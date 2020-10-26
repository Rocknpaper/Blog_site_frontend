import React, { ChangeEvent, useState, useEffect } from "react";
import "./Create.css";
import InputFeild from "../../components/UI/InputFeild/InputFeild";
import Button from "../../components/UI/Button/Button";
import TextBox from "../../components/UI/TextBox/TextBox";
import { useDispatch, useSelector } from "react-redux";
import {
  Blogs,
  ReducersType,
  BlogState,
  UserState,
  InputType,
} from "../../models";
import { addPost, editUserPostAsync } from "../../store/actions/blog_actions";
import { useParams, useHistory } from "react-router-dom";
import { redirectUrl } from "../../store/actions/user_actions";
import validate from "../../util/validation";

interface ParamType {
  id: string;
}

const Create: React.FC = () => {
  const blogs = useSelector<ReducersType, BlogState>((state) => state.blog);
  const user = useSelector<ReducersType, UserState>((state) => state.user);

  const cfg: { title: InputType; content: InputType /*tags: InputType */ } = {
    title: {
      elementConfig: {
        value: "",
        placeHolder: "Title",
        type: "text",
      },
      validation: {
        minLength: 6,
        maxLength: 64,
      },
      edit: false,
      isValid: false,
    },
    content: {
      elementConfig: {
        value: "",
        placeHolder: "Your Blog Here",
        type: "textarea",
      },
      validation: {
        minLength: 10,
        maxLength: 2000,
      },
      edit: false,
      isValid: false,
    },
    // tags: {
    //   elementConfig: {
    //     value: "",
    //     placeHolder: "Tags",
    //     type: "text",
    //   },
    //   edit: true,
    //   isValid: true,
    // },
  };

  const [feild, setFeild] = useState(cfg);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!user.logged) {
      dispatch(redirectUrl("/create-post"));
      history.push("/auth");
    }

    if (id && user.logged) {
      setEdit(true);
      const blog = blogs.blogs.find((data) => data._id?.$oid === id);
      setFeild((prev) => {
        return {
          ...prev,
          title: {
            ...prev.title,
            elementConfig: {
              ...prev.title.elementConfig,
              value: blog ? blog.title : "",
            },
            edit: true,
            isValid: validate(feild.title),
          },
          content: {
            ...prev.content,
            elementConfig: {
              ...prev.content.elementConfig,
              value: blog ? blog.content : "",
            },
            edit: true,
            isValid: validate(feild.content),
          },
        };
      });
    }
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams<ParamType>();

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFeild((prev) => {
      return {
        ...prev,
        title: {
          ...prev.title,
          elementConfig: {
            ...prev.title.elementConfig,
            value: val,
          },
          edit: true,
          isValid: validate({
            ...prev.title,
            elementConfig: { ...prev.title.elementConfig, value: val },
          }),
        },
      };
    });
  };

  const textAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setFeild((prev) => {
      return {
        ...prev,
        content: {
          ...prev.content,
          elementConfig: {
            ...prev.content.elementConfig,
            value: val,
          },
          edit: true,
          isValid: validate({
            ...prev.content,
            elementConfig: { ...prev.content.elementConfig, value: val },
          }),
        },
      };
    });
  };

  const editSubmitHandler = (event: any) => {
    event.preventDefault();
    dispatch(
      editUserPostAsync(
        id,
        feild.title.elementConfig.value,
        feild.content.elementConfig.value,
        () => {
          history.push("/");
        }
      )
    );
  };

  const SubmitHandler = (event: any) => {
    event.preventDefault();

    const blog: Blogs = {
      title: feild.title.elementConfig.value,
      content: feild.content.elementConfig.value,
      upvotes: {
        users: [],
        count: 0,
      },
      downvotes: {
        users: [],
        count: 0,
      },
    };

    let key: keyof typeof feild;
    let isValid = true;
    for (key in feild) {
      isValid = feild[key].isValid && isValid;
    }

    if (isValid) {
      dispatch(
        addPost(blog, () => {
          history.push("/");
        })
      );
    }
  };

  return (
    <form className="postForm">
      <InputFeild config={feild.title} onChange={inputChange} />
      <TextBox config={feild.content} onChange={textAreaChange} />
      {/* <InputFeild config={feild.tags} onChange={(e) => console.log(e)} /> */}
      <Button
        text="Submit"
        onClick={edit ? editSubmitHandler : SubmitHandler}
      />
    </form>
  );
};
export default Create;
