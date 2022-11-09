import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { cardsDefault } from "../../utils/mock";

export const cardsSlice = createSlice({
  name: "cards",
  initialState: cardsDefault,
  reducers: {
    createNewCard: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        priority: string;
        id: string;
        columnId: string;
      }>
    ) => {
      const { title, description, priority, id, columnId } = action.payload;

      state[id] = {
        title: title,
        description: description,
        priority: priority,
        id: id,
        columnId: columnId,
      };
    },
    deleteCard: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      delete state[id];
    },
    changeCard: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        description: string;
        priority: string;
      }>
    ) => {
      const { id, title, description, priority } = action.payload;
      state[id].title = title;
      state[id].description = description;
      state[id].priority = priority;
    },
  },
});

export const { createNewCard, deleteCard, changeCard } = cardsSlice.actions;

export default cardsSlice.reducer;
