import { useEffect, useState, useCallback, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { APP_TITLE, LOADING } from "./utils/constants";
import Catalogue from "./containers/Catalogue";
import SearchBar from "./components/SearchBar";
import {
  Container,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import playfairDisplay from "typeface-playfair-display";
import { fetchArtworks, searchArtworks } from "./slices/artworks";

const theme = createTheme({
  typography: {
    fontFamily: '"Playfair Display", cursive',
  },
  overrides: {
    CssBaseline: {
      "@global": {
        "@font-face": [playfairDisplay],
      },
    },
  },
});

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const artworks = useSelector((state) => state.artworks.artworks);
  const loading = useSelector((state) => state.artworks.loading);

  const dispatch = useDispatch();

  const fetchArtworksHandler = useCallback(
    () => dispatch(fetchArtworks(artworks.length + 1)),
    [dispatch, artworks.length]
  );

  useEffect(() => {
    fetchArtworksHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchArtworksHandler = useCallback(
    (term) => dispatch(searchArtworks(term)),
    [dispatch]
  );

  useEffect(() => {
    searchTerm && searchArtworksHandler(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  //executes when user reaches the bottom of the page
  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
      if (!searchTerm) fetchArtworksHandler();
  }, [fetchArtworksHandler, searchTerm]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const routes = (
    <Routes>
      <Route
        path="/home"
        element={
          <>
            <Container sx={{ padding: "20px" }}>
              <SearchBar
                onSearch={(value) => setSearchTerm(value)}
                id={"search-bar"}
              />
            </Container>
            <Catalogue artworks={artworks} />
          </>
        }
      />
      <Route path="*" element={<Navigate replace to="/home" />} />
    </Routes>
  );

  return (
    <div style={{ padding: "2rem" }} className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {window.innerWidth > 800 ? (
            <Typography variant={"h1"} style={{ color: "white" }}>
              {APP_TITLE}
            </Typography>
          ) : (
            <Typography variant={"h3"} style={{ color: "white" }}>
              {APP_TITLE}
            </Typography>
          )}

          <Suspense fallback={LOADING}>{routes}</Suspense>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default App;
