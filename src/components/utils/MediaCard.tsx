import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface Props {
  image: string;
  name: string;
  description: string;
}

const MediaCard: React.FC<Props> = ({ image, name, description }) => {
  return (
    <Card sx={{ maxWidth: 360 }}>
      <CardMedia sx={{ height:  300}} image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
