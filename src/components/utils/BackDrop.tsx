import { FC } from "react";
import BackdropMUI from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  open: boolean;
}

const BackDrop: FC<Props> = ({ open }) => {
  return (
    <BackdropMUI
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </BackdropMUI>
  );
};

export default BackDrop;
