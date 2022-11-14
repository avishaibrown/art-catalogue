import { useState } from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { truncateString } from "../utils/utils";

const Artwork = (props) => {
  const { artwork } = props;
  //control appearance of title, artist, and year on hover
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <Link href={artwork?.objectURL} target="_blank">
      <Card
        key={artwork?.objectID}
        onMouseOver={() => setShowOverlay(true)}
        onMouseOut={() => setShowOverlay(false)}
        id={`artwork-${artwork?.objectID}`}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height={400}
            image={
              artwork?.primaryImage === ""
                ? "./images/No-image-found.jpg"
                : artwork.primaryImage
            }
            alt="artwork"
          />
          {showOverlay && (
            <Box
              sx={{
                position: "absolute",
                zIndex: 2,
                bottom: 0,
                width: "100%",
                backgroundColor: " rgba(0, 0, 0, 0.8)",
                padding: "5px",
              }}
            >
              <Typography
                sx={{ fontWeight: "bold", color: "white", fontSize: 22 }}
                align={"left"}
                variant={"subtitle1"}
              >
                {artwork && truncateString(artwork.title, 200, true)}
              </Typography>
              <Typography
                align={"left"}
                variant={"subtitle2"}
                sx={{ color: "white", fontSize: 20 }}
              >
                {artwork?.artistDisplayName}
              </Typography>
              <Typography
                align={"left"}
                variant={"subtitle2"}
                sx={{ color: "white", fontSize: 20 }}
              >
                {artwork?.objectEndDate}
              </Typography>
            </Box>
          )}
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Artwork;
