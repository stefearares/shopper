import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../lib/listsApi";

export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (_, { getState, rejectWithValue }) => {
    const userId = getState().auth.user?.id;
    if (!userId) return [];
    const { data, error } = await api.getLists(userId);
    if (error) return rejectWithValue(error.message);
    return data;
  },
);

export const createList = createAsyncThunk(
  "lists/createList",
  async (listData, { rejectWithValue }) => {
    const { data, error } = await api.createList(listData);
    if (error) return rejectWithValue(error.message);
    return data;
  },
);

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (id, { rejectWithValue }) => {
    const { error } = await api.deleteList(id);
    if (error) return rejectWithValue(error.message);
    return id;
  },
);

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    items: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchLists.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default listsSlice.reducer;
