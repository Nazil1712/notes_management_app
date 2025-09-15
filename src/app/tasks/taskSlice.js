// src/features/tasks/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Adjust this to your backend API URL
const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  tasks: [],
  rowViewTasks: [],
  loading: false,
  error: null,
  taskUpdated: false
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

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask", 
  async (id) => {
    const response = await axios.delete(`${API_URL}/api/tasks/${id}`);
    // console.log(`Delete Response => ${response}`)
    return response.data;
  }
); 


export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }) => {
    console.log("Updates",updates)
    const response = await axios.patch(`${API_URL}/api/tasks/update/${id}`, updates);
    return response.data;
  }
);


export const reOrderTask = createAsyncThunk(
  "tasks/reOrderTask",
  async ({ id, updates }) => {
    console.log("Updates",updates)
    const response = await axios.patch(`${API_URL}/api/tasks/reorder/${id}`, updates);
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskUpdated: (state, action) => {
      state.taskUpdated = action.payload;
    }, 
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.taskUpdated = false;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.kanbanView;
        state.rowViewTasks = action.payload.rowView;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state) => {
        /* const newTask = action.payload;
        if (newTask.status === "To Do") {
          state.tasks.toDoTasks.push(newTask);
        } else if (newTask.status === "In Progress") {
          state.tasks.inProgressTasks.push(newTask);
        } else if (newTask.status === "Completed") {
          state.tasks.completedTasks.push(newTask);
        } */

        state.taskUpdated = true;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        // state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        state.taskUpdated = true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state) => {
        /* const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        } */
        state.taskUpdated = true;

      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(reOrderTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(reOrderTask.fulfilled, (state) => {
        /* const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        } */
        state.taskUpdated = true;

      })
      .addCase(reOrderTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
  },
});

export const {setTaskUpdated} = tasksSlice.actions;


export default tasksSlice.reducer;
