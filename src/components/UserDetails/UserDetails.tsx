import React from "react";
import InputFeild from "../UI/InputFeild/InputFeild";
import Label from "../UI/Label/Label";
import "./UserDetails.css";

const UserDetails: React.FC = () => {
  return (
    <div className="userDetails">
      <div className="user__avatar">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div className="user__details">
        <Label text="username" />
        <InputFeild
          type="text"
          value="Tharun"
          onChange={(e) => console.log(e.target.value)}
          placeHolder="username"
        />
        <Label text="email" />
        <InputFeild
          type="text"
          value="tharun@gmail.com"
          onChange={(e) => console.log(e.target.value)}
          placeHolder="email"
        />
      </div>
    </div>
  );
};

export default UserDetails;
