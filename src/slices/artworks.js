import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MetService from "../services/MetService";
import { getRandomInt } from "../utils/utils";
import { ARTWORKS_TO_LOAD } from "../utils/constants";

const initialState = {
  loading: false,
  error: null,
  artworks: [],
};

export const fetchArtworks = createAsyncThunk(
  "artworks/fetchArtworks",
  async (arg, { getState }) => {
    try {
      const state = getState();
      const newArtworks = [];
      do {
        //pick random integer and check if that objectID is already displayed
        let objectID = getRandomInt(1, 471581);
        let objectIDsDisplayed = state.artworks.artworks.map(
          (artwork) => artwork.objectID
        );
        //if not, call the API on that objectID and add it to the display if there is data
        if (!objectIDsDisplayed.includes(objectID)) {
          await MetService.get(objectID)
            .then((response) => {
              newArtworks.push(response.data);
            })
            .catch((error) => {
              console.error(error.message);
            });
        }
      } while (newArtworks.length < ARTWORKS_TO_LOAD);
      return newArtworks;
    } catch (error) {
      return error.message;
    }
  }
);

export const searchArtworks = createAsyncThunk(
  "artworks/searchArtworks",
  async (term, { getState }) => {
    try {
      let newArtworks = [];

      //get all objectIDs that match search term from server
      const res = await MetService.findByTerm(term);
      let searchResultObjectIDs = res.data.objectIDs;

      do {
        //populate objectIDs array configurable range of unique objectIDs from server
        let objectIDs;
        if (searchResultObjectIDs.length >= ARTWORKS_TO_LOAD) {
          objectIDs = searchResultObjectIDs.splice(0, ARTWORKS_TO_LOAD);
        } else {
          objectIDs = searchResultObjectIDs;
        }

        //retrieve object for each objectID from server if it contains data
        for (let objectID of objectIDs) {
          await MetService.get(objectID)
            .then((response) => {
              newArtworks.push(response.data);
            })
            .catch((error) => {
              console.error(error.message);
            });
        }
      } while (!!searchResultObjectIDs && newArtworks.length < 10);

      return newArtworks;
    } catch (error) {
      return error.message;
    }
  }
);

const artworksSlice = createSlice({
  name: "artworks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchArtworks.fulfilled, (state, action) => {
        state.loading = false;
        for (let artwork of action.payload) {
          state.artworks.push(artwork);
        }
      })
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchArtworks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchArtworks.fulfilled, (state, action) => {
        state.loading = false;
        state.artworks = [...action.payload];
      })
      .addCase(searchArtworks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer } = artworksSlice;
export default reducer;
