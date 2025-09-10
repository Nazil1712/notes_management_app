// src/features/tasks/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Adjust this to your backend API URL
const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  tasks: {
    toDoTasks: [],
    inProgressTasks: [],
    completedTasks: []
  },
  loading: false,
  error: null,
};

// Fetch all tasks
export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchAllTasks",
  async () => {
    const response = await axios.get(`${API_URL}/api/tasks/allTasks`);
    return response.data;
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData) => {
    // console.log(taskData)
    const response = await axios.post(`${API_URL}/api/tasks`, taskData);
  return response.data;
  }
);

/* 
// Update task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }) => {
    const response = await axios.put(`${API_URL}/${id}`, updates);
    return response.data;
  }
);

// Delete task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
}); */


const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        console.log("Action payload",action.payload)
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const newTask = action.payload;
        if (newTask.status === "To Do") {
          state.tasks.toDoTasks.push(newTask);
        } else if (newTask.status === "In Progress") {
          state.tasks.inProgressTasks.push(newTask);
        } else if (newTask.status === "Completed") {
          state.tasks.completedTasks.push(newTask);
        }
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      /*
      // Update
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      }); */
  },
});

export default tasksSlice.reducer;
