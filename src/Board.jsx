import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchAllTasks } from "./app/tasks/taskSlice";
import TaskForm from "./app/TaskForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import PopupBox from "./common/PopupBox";

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

const TaskCard = ({ task, isOpen, onToggle, setOpenDropdownId }) => {
  const [showPopUp, setShowPopUp] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null); // close dropdown
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setOpenDropdownId]);

  return (
    <>
      <div className="bg-white p-4 rounded-2xl shadow-sm border space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <Tag label={task.tag} />
          </div>

          {/* Ellipsis button */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={onToggle}
              className="hover:bg-gray-100 rounded-full p-1"
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>

            <PopupBox
              title={`Delete ${task.title} ?`}
              message={`Do you really want to delete this task? After deleting, you won’t be able to see this task again!`}
              dangerOption={"Delete"}
              cancelOption={"Cancel"}
              dangerAction={() => handleDelete(task.id)}
              cancleAction={() => setShowPopUp(-1)}
              showPopUp={showPopUp === task.id}
            />

            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-white border rounded-lg shadow-lg z-10">
                <ul className="text-sm">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={()=>setShowForm(true)}
                  >
                    Edit
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowPopUp(task.id)}
                  >
                    Delete
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Move To
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-gray-700">{task.title}</h3>

        <div className="flex justify-between">
          <p className="text-xs font-medium text-gray-600">Progress</p>
          <p className="text-xs font-bold">{task.progress} %</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              task.status == "Completed"
                ? "bg-green"
                : task.status == "To Do"
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
              <img className="w-4 h-4" src="viewsIcon.png" alt="" />{" "}
              {task.views}
            </span>
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
    </>
  );
};

const Column = ({ title, tasks, openDropdownId, onToggle, setOpenDropdownId }) => {
  const [showForm, setShowForm] = useState(false);

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
          {tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              isOpen={openDropdownId === t.id}
              onToggle={() => onToggle(t.id)}
              setOpenDropdownId={setOpenDropdownId}
            />
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
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleToggle = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };
  const backEndTasks = useSelector((state) => state.tasks.tasks);
  const taskUpdated  = useSelector((state) => state.tasks.taskUpdated);

  console.log("tasks", backEndTasks);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch, taskUpdated]);

  return (
    <>
      {backEndTasks.length == 0 ? (
        "Loading"
      ) : (
        <div className="bg-white p-7">
          <div className="flex space-x-6 overflow-x-auto">
            <Column
              title="To Do"
              tasks={backEndTasks.toDoTasks}
              openDropdownId={openDropdownId}
              onToggle={handleToggle}
              setOpenDropdownId={setOpenDropdownId}
            />
            <Column
              title="In Progress"
              tasks={backEndTasks.inProgressTasks}
              openDropdownId={openDropdownId}
              onToggle={handleToggle}
              setOpenDropdownId={setOpenDropdownId}
            />
            <Column
              title="Completed"
              tasks={backEndTasks.completedTasks}
              openDropdownId={openDropdownId}
              onToggle={handleToggle}
              setOpenDropdownId={setOpenDropdownId}
            />
          </div>
        </div>
      )}
    </>
  );
}
