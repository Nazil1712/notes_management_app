import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "./app/tasks/taskSlice";
import TaskForm from "./app/TaskForm";

const dotsByStatus = {
  "To Do": "bg-button-blue rounded-full w-2 h-2",
  "In Progress": "bg-orange rounded-full w-2 h-2",
  Completed: "bg-green rounded-full w-2 h-2",
};

const Tag = ({ label }) => {
  const colors = {
    Important: "bg-green-100 text-green-600 font-semibold",
    Meh: "bg-blue-100 text-blue-600 font-semibold",
    OK: "bg-yellow-100 text-yellow-600 font-semibold",
    "High Priority": "bg-red-100 text-red-600 font-semibold",
    "Not that important": "bg-red-100 text-red-600 font-semibold",
  };
  return (
    <span
      className={`text-xs px-2 py-1 rounded-4xl ${colors[label]} relative bottom-1 right-1`}
    >
      {label}
    </span>
  );
};

const TaskCard = ({ task }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border space-y-3">
    <Tag label={task.tag} />
    <h3 className="font-semibold text-gray-700 mt-3">{task.title}</h3>

    <div className="flex justify-between">
      <p className="text-xs font-medium text-gray-600">Progress</p>
      <p className="text-xs font-bold">{task.progress} %</p>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${
          task.status=="Completed"
            ? "bg-green"
            : task.status=="To Do"
            ? "bg-button-blue"
            : "bg-orange"
        }`}
        style={{ width: `${task.progress == 0 ? 2 : task.progress}%` }}
      ></div>
    </div>

    <div className="flex justify-between text-sm text-gray-500">
      <div></div>
      <div className="flex gap-4">
        <span className="flex items-center gap-1">
          <img className="w-4 h-4" src="/commentsIcon.png" alt="" />{" "}
          {task.comments}
        </span>
        <span className="flex items-center gap-1">
          <img className="w-4 h-4" src="viewsIcon.png" alt="" /> {task.views}
        </span>
      </div>
    </div>
  </div>
);

const Column = ({ title, tasks }) => {
  const [showForm, setShowForm] = useState(false);

  const handleCreateTask = (data) => {
    console.log("New task:", data);
    setShowForm(false); // close after submit
    // here you can also add logic to update your tasks list
  };

  return (
    <>
      <div className="w-[29vw] flex-shrink-0 bg-background-card-background p-4 rounded-xl border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <p className={`${dotsByStatus[title]}`}></p>
            <h2 className="font-extrabold text-xl">{title}</h2>
            <p className="font-bold text-xl text-gray-500">({tasks.length})</p>
          </div>
          <span
            onClick={() => setShowForm(true)}
            className="text-xs text-gray-500 cursor-pointer"
          >
            <img
              src="/plusIcon.png"
              alt=""
              className="border box-border border-gray-200 p-2 rounded-full hover:bg-gray-100 
             transition-transform duration-300 transform hover:rotate-90"
            />
          </span>
        </div>
        <div className="space-y-4">
          {tasks.map((t, i) => (
            <TaskCard key={i} task={t} />
          ))}
        </div>
      </div>

      {/* Popup Modal for Task Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[70%] max-w-md">
            <TaskForm
              mode="create"
              onCancel={() => setShowForm(false)}
              setShowForm={setShowForm}
              title={title}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default function Board() {
  const dispatch = useDispatch();

  const backEndTasks = useSelector((state) => state.tasks.tasks);

  console.log("tasks", backEndTasks);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  return (
    <>
      {backEndTasks.length==0 ? (
        "Loading"
      ) : (
        <div className="bg-white p-7">
          <div className="flex space-x-6 overflow-x-auto">
            <Column title="To Do" tasks={backEndTasks.toDoTasks} />
            <Column title="In Progress" tasks={backEndTasks.inProgressTasks} />
            <Column title="Completed" tasks={backEndTasks.completedTasks} />
          </div>
        </div>
      )}
    </>
  );
}
