import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "./app/tasks/taskSlice";
import Column from "./Column";


import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";


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
