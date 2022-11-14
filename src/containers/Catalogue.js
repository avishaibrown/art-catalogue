import React from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
import { NO_RESULTS_FOUND } from "../utils/constants";
import Artwork from "../components/Artwork";

const Catalogue = (props) => {
  const { artworks } = props;

  //TODO: Make cards bigger

  return (
    <Box>
      {artworks ? (
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 4 }}>
          {artworks?.map((artwork) => (
            <Grid item xs={2} sm={2} md={2} key={artwork.objectID}>
              <Artwork
                key={artwork.objectID}
                artwork={artwork}
                id={`artwork-${artwork.objectID}`}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Container maxWidth={"sm"} style={{ paddingTop: "3rem" }}>
          <Grid justifyContent="center">
            <Typography variant={"h5"} style={{ color: "white" }}>
              {NO_RESULTS_FOUND}
            </Typography>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default Catalogue;
