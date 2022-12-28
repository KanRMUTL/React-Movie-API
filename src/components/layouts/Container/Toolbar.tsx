import React, { FC } from "react";
import { Toolbar as ToolbarMUI, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  onDrawerOpen: () => void;
  open: boolean;
}

const Toolbar: FC<Props> = ({ onDrawerOpen, open }) => {
  return (
    <ToolbarMUI>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Movies
      </Typography>
    </ToolbarMUI>
  );
};

export default Toolbar;
