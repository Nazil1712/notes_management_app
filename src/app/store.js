import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "../app/tasks/taskSlice"

export const store = configureStore({
    reducer: {
        tasks: tasksReducer
    }
})