import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  InputBase,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SEARCH_BAR_PLACEHOLDER } from "../utils/constants";

const SearchBar = (props) => {
  const { onSearch } = props;
  const [searchValue, setSearchValue] = useState("");
  const loading = useSelector((state) => state.loading);

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={SEARCH_BAR_PLACEHOLDER}
        onChange={(e) => setSearchValue(e.target.value)}
        autoFocus={true}
        fullWidth={true}
        value={searchValue}
        disabled={loading}
        id={"search-bar"}
      />
      {loading ? (
        <Box sx={{ display: "flex", p: "10px" }}>
          <CircularProgress size={25} />
        </Box>
      ) : (
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          onClick={() => onSearch(searchValue)}
          id={"search-icon"}
        >
          <SearchIcon />
        </IconButton>
      )}
    </Paper>
  );
};

export default SearchBar;
