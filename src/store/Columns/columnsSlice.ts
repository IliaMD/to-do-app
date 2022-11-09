import { createSlice } from "@reduxjs/toolkit";
import { columns, ColumnsType } from "../../utils/mock";
import { v4 as uuidv4 } from "uuid";
import { PayloadAction } from "@reduxjs/toolkit";

export const columnsSlice = createSlice({
  name: "columns",
  initialState: columns,
  reducers: {
    createNewColumn: (state) => {
      const newColumn: ColumnsType = {
        name: "New",
        columnId: uuidv4(),
      };
      state.push(newColumn);
    },
    deleteColumn: (state, action) => {
      return (state = state.filter(({ columnId }) => {
        return columnId !== action.payload;
      }));
    },
    changeName: (
      state,
      action: PayloadAction<{
        name: string;
        columnId: string;
      }>
    ) => {
      const exactColumn = state.findIndex(
        (obj) => obj.columnId === action.payload.columnId
      );
      state[exactColumn].name = action.payload.name;
    },
  },
});

export const { createNewColumn, deleteColumn, changeName } =
  columnsSlice.actions;

export default columnsSlice.reducer;
