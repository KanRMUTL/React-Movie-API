import React from "react";
import { List } from "@mui/material";
import MenuItem from "./MenuItem";
import path from "../../../constance/path";

function MenuList() {
  return (
    <List>
      <MenuItem path={path.home} label="Home" />
      <MenuItem path={path.movies} label="Movies" />
    </List>
  );
}

export default MenuList;
