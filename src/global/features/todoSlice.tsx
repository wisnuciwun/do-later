"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     todos: []
};

export const todoSlice = createSlice({
     name: "todoSlice",
     initialState,
     reducers: {
          addNewTodo: (state, action) => {
               state.todos = action.payload;
          },
     },
});

export const { addNewTodo } = todoSlice.actions

export default todoSlice.reducer;