import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as listsApi from "../lib/listsApi";
import * as itemsApi from "../lib/listItemsApi";

export const fetchActiveList = createAsyncThunk(
  "activeList/fetch",
  async (listId, { rejectWithValue }) => {
    const [listRes, itemsRes] = await Promise.all([
      itemsApi.getListById(listId),
      itemsApi.getListItems(listId),
    ]);
    if (listRes.error) return rejectWithValue(listRes.error.message);
    if (itemsRes.error) return rejectWithValue(itemsRes.error.message);
    return { list: listRes.data, items: itemsRes.data };
  },
);

export const updateListMeta = createAsyncThunk(
  "activeList/updateListMeta",
  async ({ id, title, date }, { rejectWithValue }) => {
    const { error } = await listsApi.updateListMeta({ id, title, date });
    if (error) return rejectWithValue(error.message);
    return { title, date };
  },
);

export const addItem = createAsyncThunk(
  "activeList/addItem",
  async ({ listId, name, price }, { rejectWithValue }) => {
    const { data, error } = await itemsApi.addItem({ listId, name, price });
    if (error) return rejectWithValue(error.message);
    return data;
  },
);

export const updateItemStatus = createAsyncThunk(
  "activeList/updateItemStatus",
  async ({ id, status }, { rejectWithValue }) => {
    const { error } = await itemsApi.updateItem({ id, status });
    if (error) return rejectWithValue(error.message);
    return { id, status };
  },
);

export const deleteItem = createAsyncThunk(
  "activeList/deleteItem",
  async (id, { rejectWithValue }) => {
    const { error } = await itemsApi.deleteItem(id);
    if (error) return rejectWithValue(error.message);
    return id;
  },
);

const activeListSlice = createSlice({
  name: "activeList",
  initialState: {
    list: null,
    items: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    clearActiveList(state) {
      state.list = null;
      state.items = [];
      state.isLoading = false;
      state.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveList.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchActiveList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.list;
        state.items = action.payload.items;
      })
      .addCase(fetchActiveList.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(updateListMeta.fulfilled, (state, action) => {
        if (state.list) {
          state.list.title = action.payload.title;
          state.list.date = action.payload.date;
        }
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItemStatus.fulfilled, (state, action) => {
        const item = state.items.find((i) => i.id === action.payload.id);
        if (item) item.status = action.payload.status;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

export const { clearActiveList } = activeListSlice.actions;
export default activeListSlice.reducer;
