import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal, Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  fetchAllTasks,
  reOrderRowPosition,
  updateTask,
} from "./app/tasks/taskSlice";
import { Tag } from "./TaskCard";
import TaskForm from "./app/TaskForm";
import PopupBox from "./common/PopupBox";

const SortableItem = ({ task }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [value, setValue] = useState(task.status);
  const [showForm, setShowForm] = useState(false);
  const [showPopUp, setShowPopUp] = useState(null);

  const dispatch = useDispatch();

  const handleStatusChange = (id, newStatus) => {
    setValue(newStatus);
    dispatch(updateTask({ id, updates: { status: newStatus } }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div
      key={task.id}
      style={style}
      ref={setNodeRef}
      {...attributes}
      className={`grid grid-cols-[0.3fr_2fr_1fr_1fr_1fr_1fr_1fr_2fr] items-center px-4 py-2 border-b text-sm hover:bg-gray-50 ${
        isDragging ? "z-40 opacity-50 bg-white shadow-md" : "bg-white"
      }`}
    >
      <div {...listeners} className="cursor-grab">
        <GripHorizontal />
      </div>
      {/* <div>1</div> */}

      {/* Title */}
      <div className="truncate font-medium">{task.title}</div>

      {/* Tag */}
      <div>
        <Tag label={task.tag} />
      </div>
      {/* <div className="text-gray-600">{task.tag}</div> */}

      {/* Status */}
      <div>
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(task.id, e.target.value)}
          className={`px-2 py-1 text-xs font-medium rounded border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-0
                  ${
                    task.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : ""
                  }
                  ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : ""
                  }
                  ${task.status === "To Do" ? "bg-gray-100 text-gray-700" : ""}
                  `}
        >
          <option value="To Do" className="bg-gray-100 text-gray-700">
            To Do
          </option>
          <option value="In Progress" className="bg-blue-100 text-blue-700">
            In Progress
          </option>
          <option value="Completed" className="bg-green-100 text-green-700">
            Completed
          </option>
        </select>
      </div>

      {/* Progress */}
      <div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              task.status == "Completed"
                ? "bg-green"
                : task.status == "To Do"
                ? "bg-button-blue"
                : "bg-orange"
            }`}
            style={{ width: `${task.progress == 0 ? 4 : task.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Comments */}
      <div className="text-gray-600 ml-20">{task.comments}</div>

      {/* Views */}
      <div className="text-gray-600">{task.views}</div>

      {/* Assignees (avatars) */}
      <div className="flex justify-between">
        <div className="flex -space-x-2">
          {task.images.slice(0, 4).map((img, i) => (
            <img
              key={i}
              src={`/${img}`}
              alt="user"
              className="h-8 w-8 rounded-full border-2 border-white"
            />
          ))}
          {task.images.length > 4 && (
            <div className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-white bg-indigo-50 text-xs font-medium text-indigo-600">
              +{task.images.length - 4}
            </div>
          )}
        </div>

        <div className=" flex">
          <div
            className="hover:bg-gray-200 cursor-pointer p-2 rounded-4xl"
            onClick={() => setShowForm(true)}
          >
            <Pencil size={20} color="#007bff"/>
          </div>
          <div
            className="hover:bg-gray-200 cursor-pointer p-2 rounded-4xl"
            onClick={() => setShowPopUp(task.id)}
          >
            <Trash size={20} color="#ff3333"/>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[70%] max-w-md">
            <TaskForm
              mode="update"
              onCancel={() => setShowForm(false)}
              setShowForm={setShowForm}
              title={task.title}
              taskData={task}
            />
          </div>
        </div>
      )}

      <PopupBox
        title={`Delete ${task.title} ?`}
        message={`Do you really want to delete this task? After deleting, you won’t be able to see this task again!`}
        dangerOption={"Delete"}
        cancelOption={"Cancel"}
        dangerAction={() => handleDelete(task.id)}
        cancleAction={() => setShowPopUp(-1)}
        showPopUp={showPopUp === task.id}
      />
    </div>
  );
};

export default function RowView() {
  const [activeId, setActiveId] = useState(null);
  const tasksData = useSelector((state) => state.tasks.rowViewTasks);
  const taskUpdated = useSelector((state) => state.tasks.taskUpdated);
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState(tasksData);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (tasksData.length != 0) {
      setTasks(tasksData);
    }
  }, [tasksData]);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch, taskUpdated]);

  const handleDragStart = (e) => {
    setActiveId(e.active.id);
  };

  const handleDragEnd = (e) => {
    setActiveId(null);
    const { active, over } = e;

    if (!over) return;
    if (active.id === over.id) return;

    setTasks((tasks) => {
      const oldIndex = tasks.findIndex((item) => item.id === active.id);
      const newIndex = tasks.findIndex((item) => item.id === over.id);

      console.log("Active Id ==>", active.id);
      console.log("over Id ==>", over.id);
      console.log("Old Index ==> ", oldIndex);
      console.log("New Index ==> ", newIndex);

      dispatch(
        reOrderRowPosition({ id: active.id, updates: { oldIndex, newIndex } })
      );

      return arrayMove(tasks, oldIndex, newIndex);
    });
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const getActiveItem = () => {
    return tasks.find((task) => task.id === activeId)?.title;
  };

  return (
    <>
      <div className="flex items-baseline mb-5 gap-5">
        <div className="flex items-center gap-2 bg-gray-200 p-1 px-2 rounded-sm">
          <h2 className="font-extrabold text-xl">Total Tasks</h2>
          <p className="font-bold text-xl text-gray-500">({tasks.length})</p>
        </div>
        <div>
          <button
            onClick={() => setShowForm(true)}
            className="cursor-pointer flex gap-2 font-medium bg-gray-200 rounded-sm p-1 px-2
          hover:bg-gray-300 hover:text-gray-800 group"
          >
            Add Task
            <div className="transition-transform duration-300 transform group-hover:rotate-90">
              <Plus />
            </div>
          </button>
        </div>
      </div>

      <div className="w-full border rounded-md overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[0.3fr_2fr_1fr_1fr_1fr_1fr_1fr_2fr] bg-gray-100 text-sm font-semibold px-4 py-2 border-b">
          <div></div>
          <div>Title</div>
          <div>Tag</div>
          <div>Status</div>
          <div>Progress</div>
          <div className="ml-10">Comments</div>
          <div>Views</div>
          <div>Assignees</div>
        </div>

        {/* Rows */}
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <div>
              {tasks.map((task) => (
                <SortableItem key={task.id} task={task} />
              ))}
            </div>
          </SortableContext>
          <DragOverlay
            adjustScale={true}
            dropAnimation={{
              duration: 150,
              easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            }}
          >
            {activeId ? (
              <div
                className="cursor-grabbing rounded-md border-2 bg-white border-indigo-500 p-4 shadow-md 
            w-[50%]"
              >
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">
                    <GripHorizontal />
                  </span>
                  <span className="text-gray-500">{getActiveItem()}</span>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[70%] max-w-md">
            <TaskForm
              mode="create"
              onCancel={() => setShowForm(false)}
              setShowForm={setShowForm}
              title={"To Do"}
            />
          </div>
        </div>
      )}
    </>
  );
}
