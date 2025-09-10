import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "./tasks/taskSlice";

export default function TaskForm({ onCancel , setShowForm, mode = "create", title}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
  });

  const dispatch = useDispatch();

  return (
    <form onSubmit={handleSubmit((data)=>{
      console.log("New Task Data",data)
      setShowForm(false)
      dispatch(addTask(data))

    })} className="space-y-4">
      {/* Task Name */}
      <div>
        <label className="block text-sm font-medium">Task Title</label>
        <input
          type="text"
          {...register("title", { required: "Task title is required" })}
          className="mt-1 block w-full rounded-md border px-3 py-2"
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Due Date */}
      {/* <div>
        <label className="block text-sm font-medium">Due Date</label>
        <input
          type="date"
          {...register("dueDate", { required: "Due date is required" })}
          className="mt-1 block w-full rounded-md border px-3 py-2"
        />
        {errors.dueDate && (
          <p className="text-xs text-red-500">{errors.dueDate.message}</p>
        )}
      </div> */}

      {/* Tag */}
      <div>
        <label className="block text-sm font-medium">Task Tag</label>
        <select
          {...register("tag", { required: "Task tag is required" })}
          className="mt-1 w-full rounded-md border px-3 py-2"
        >
          <option value="">-- Select --</option>
          <option value="Important">Important</option>
          <option value="OK">OK</option>
          <option value="High Priority">High Priority</option>
          <option value="Not that important">Not that important</option>
          <option value="Meh">Meh</option>
        </select>
      </div>

      {/* Assignee */}
      <div>
        <label className="block text-sm font-medium">Users</label>
        <select
          {...register("users", { required: "Select an users" })}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          
        >
          <option value="">-- Select --</option>
          <option value="john">John</option>
          <option value="sara">Sara</option>
        </select>
        {errors.users && (
          <p className="text-xs text-red-500">{errors.users.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          {...register("status")}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          value={title}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Project */}
      {/* <div>
        <label className="block text-sm font-medium">Project</label>
        <select
          {...register("project", { required: "Select a project" })}
          className="mt-1 block w-full rounded-md border px-3 py-2"
        >
          <option value="">-- Select Project --</option>
          <option value="website-redesign">Website Redesign</option>
          <option value="mobile-app">Mobile App</option>
        </select>
        {errors.project && (
          <p className="text-xs text-red-500">{errors.project.message}</p>
        )}
      </div> */}

      <div>
        <label className="block text-sm font-medium">Description</label>
        <input
          type="text"
          {...register("description")}
          className="mt-1 block w-full rounded-md border px-3 py-2"
        />
        {/* {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )} */}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          {mode === "create" ? "Create Task" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
