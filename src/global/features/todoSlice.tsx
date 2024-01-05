"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     todos: []
};

export const todoSlice = createSlice({
     name: "todoSlice",
     initialState,
     reducers: {
          changeTodosData: (state, action) => {
               state.todos = action.payload;
          },
     },
});

export const { changeTodosData } = todoSlice.actions

export default todoSlice.reducer;