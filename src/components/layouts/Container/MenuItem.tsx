import React, { FC } from "react";
import styled from "styled-components";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Link } from "react-router-dom";

interface Props {
  path: string;
  label: string;
}

const MenuItem: FC<Props> = ({ path, label }) => {
  return (
    <ListItem key={1} disablePadding>
    <ListItemButton>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <CustomLink to={path}>
        <ListItemText primary={label} />
      </CustomLink>
    </ListItemButton></ListItem>
  );
};

export default MenuItem;

const CustomLink = styled(Link)`
  color: #000000;
  text-decoration: none;
`;
