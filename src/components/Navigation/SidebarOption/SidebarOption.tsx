import React from "react";
import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { NavLink } from "react-router-dom";
import "./SidebarOption.css";

interface PropsType {
  text: string;
  path: string;
  exact?: boolean;
  Icon: OverridableComponent<SvgIconTypeMap>;
}

const SidebarOptions: React.FC<PropsType> = ({ text, Icon, exact, path }) => {
  return (
    <NavLink
      to={path}
      exact={exact ? true : false}
      className="sidebarOption"
      activeClassName="sidebarOption--active"
    >
      <Icon />
      <span>{text}</span>
    </NavLink>
  );
};

export default SidebarOptions;
