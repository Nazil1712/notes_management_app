import { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import TaskForm from "./app/TaskForm";
import { useDroppable } from "@dnd-kit/core";

const dotsByStatus = {
  "To Do": "bg-button-blue rounded-full w-2 h-2",
  "In Progress": "bg-orange rounded-full w-2 h-2",
  Completed: "bg-green rounded-full w-2 h-2",
};

const Column = ({
  title,
  droppableId,
  tasks,
  openDropdownId,
  onToggle,
  setOpenDropdownId,
}) => {
  const [showForm, setShowForm] = useState(false);

  const { setNodeRef } = useDroppable({ id: droppableId });


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
        <div ref={setNodeRef}>
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {tasks.map((t, index) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  index={index}
                  isOpen={openDropdownId === t.id}
                  onToggle={() => onToggle(t.id)}
                  setOpenDropdownId={setOpenDropdownId}
                />
              ))}
            </div>
          </SortableContext>

          
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

export default Column;
