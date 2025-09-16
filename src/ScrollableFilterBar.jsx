import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "./app/tasks/taskSlice";



const ScrollableFilterBar = () => {
  const [active, setActive] = useState("By Total Tasks");

  const tasksData = useSelector((state) => state.tasks.rowViewTasks);
  const taskUpdated = useSelector((state) => state.tasks.taskUpdated);
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState(tasksData);

  const filters = [
  { label: "By Status" },
  { label: "By Total Tasks", count: tasks.length },
  { label: "Tasks Due" },
  { label: "Assigned To Me" },
  { label: "Completed" },
  { label: "In Progress" },
  ];

  useEffect(() => {
    if (tasksData.length != 0) {
      setTasks(tasksData);
    }
  }, [tasksData]);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch, taskUpdated]);

  return (
    <div className="overflow-x-auto no-scrollbar border-b-2 border-gray-300 ml-4 mr-4">
      <div className="flex space-x-8 max-w-screen ml-4">
        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActive(filter.label)}
            className={`relative py-3 text-base font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              active === filter.label ? "font-bold " : "text-gray-500 "
            }`}
          >
            {filter.label}

            {filter.count && (
              <span
                className={`px-2 py-0.5 text-xs rounded-full border bg-indigo-50 ${
                  active === filter.label
                    ? "border-indigo-400 text-button-blue"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {filter.count}
              </span>
            )}

            {/* underline indicator */}
            {active === filter.label && (
              <span className="absolute bottom-0 w-full h-[2px] bg-button-blue rounded-full"></span>
            )}
          </button>
        ))}
      </div>
      {/* <div className="bg-gray-200 h-0.5 ml-3 w-full">

      </div> */}
    </div>
  );
};

export default ScrollableFilterBar;
