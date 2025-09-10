import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "./app/tasks/taskSlice";

const dotsByStatus = {
  "To Do": "bg-button-blue rounded-full w-2 h-2",
  "In Progress": "bg-orange rounded-full w-2 h-2",
  Completed: "bg-green rounded-full w-2 h-2",
};

const Tag = ({ label }) => {
  const colors = {
    Important: "bg-blue-100 text-blue-600 font-semibold",
    Meh: "bg-blue-100 text-blue-600 font-semibold",
    OK: "bg-yellow-100 text-yellow-600 font-semibold",
    "High Priority": "bg-red-100 text-red-600 font-semibold",
    "Not that important": "bg-red-100 text-red-600 font-semibold",
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-md ${colors[label]}`}>
      {label}
    </span>
  );
};

const TaskCard = ({ task }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border space-y-3">
    <Tag label={task.tag} />
    <h3 className="font-semibold text-gray-700">{task.title}</h3>

    <div className="flex justify-between">
      <p className="text-xs font-medium text-gray-600">Progress</p>
      <p className="text-xs font-bold">{task.progress} %</p>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${
          task.progress === 100
            ? "bg-green"
            : task.progress == 0
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

const Column = ({ title, tasks }) => (
  <div className="w-[30vw] flex-shrink-0 bg-background-card-background p-4 rounded-xl border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <p className={`${dotsByStatus[title]}`}></p>
        <h2 className="font-bold text-gray-800">{title}</h2>
      </div>
      <span className="text-xs text-gray-500">
        <img
          src="/plusIcon.png"
          alt=""
          className="border box-border border-gray-200 p-2 rounded-full"
        />
      </span>
    </div>
    <div className="space-y-4">
      {tasks.map((t, i) => (
        <TaskCard key={i} task={t} />
      ))}
    </div>
  </div>
);

export default function Board() {
  const dispatch = useDispatch();

  const backEndTasks = useSelector((state) => state.tasks.tasks);

  console.log("tasks", backEndTasks);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  return (
    <>
      {backEndTasks == null ? (
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
