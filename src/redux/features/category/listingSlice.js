import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tokenListings: [],
  loading: false,
  lastFetchTime: null,
  error: null,
  searchResults: [],
  savedCoins: [],
};

const listingSlice = createSlice({
  name: 'listing',
  initialState: initialState,
  reducers: {
    addTokenListings: (state, action) => {
      state.tokenListings = action.payload;
    },
    listingLastFetchTime: (state, action) => {
      state.lastFetchTime = action.payload;
    },
    savedCoinListing: (state, action) => {
      state.savedCoins = [...state.savedCoins, action.payload];
    },
    unSaveCoinListing: (state, action) => {
      const updatedLikedItems = state.savedCoins.filter(
        item => item.id !== action.payload.id,
      );

      state.savedCoins = updatedLikedItems;
    },
  },
});

export const {
  addTokenListings,
  listingLastFetchTime,
  savedCoinListing,
  unSaveCoinListing,
} = listingSlice.actions;
export default listingSlice.reducer;
