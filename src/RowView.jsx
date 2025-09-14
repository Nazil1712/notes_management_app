import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

  return (
    <div
      key={task.id}
      style={style}
      ref={setNodeRef}
      {...attributes}
      className={`grid grid-cols-[0.3fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center px-4 py-2 border-b text-sm hover:bg-gray-50 ${
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
      <div className="text-gray-600">{task.tag}</div>

      {/* Status */}
      <div>
        <span
          className={`px-2 py-1 rounded text-xs font-medium
                  ${
                    task.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : task.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
        >
          {task.status}
        </span>
      </div>

      {/* Progress */}
      <div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              task.progress === 100 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${task.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Comments */}
      <div className="text-gray-600 ml-20">{task.comments}</div>

      {/* Views */}
      <div className="text-gray-600">{task.views}</div>

      {/* Assignees (avatars) */}
      <div className="flex -space-x-2">
        {task.images.slice(0, 4).map((img, i) => (
          <img
            key={i}
            src={`/${img}`}
            alt="user"
            className="h-7 w-7 rounded-full border-2 border-white"
          />
        ))}
        {task.images.length > 4 && (
          <div className="h-7 w-7 flex items-center justify-center rounded-full border-2 border-white bg-indigo-50 text-xs font-medium text-indigo-600">
            +{task.images.length - 4}
          </div>
        )}
      </div>
    </div>
  );
};

export default function RowView() {
  const [activeId, setActiveId] = useState(null);
  const tasksData = useSelector((state) => state.tasks.rowViewTasks);

  const [tasks, setTasks] = useState(tasksData);

  useEffect(() => {
    if (tasksData.length != 0) {
      setTasks(tasksData);
    }
  }, [tasksData]);

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

      return arrayMove(tasks, oldIndex, newIndex);
    });
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const getActiveItem = () =>{
    return tasks.find((task)=>task.id===activeId)?.title
  }

  return (
    <div className="w-full border rounded-md overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[0.3fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-gray-100 text-sm font-semibold px-4 py-2 border-b">
        <div></div>
        <div>Title</div>
        <div>Tag</div>
        <div>Status</div>
        <div>Progress</div>
        <div>Comments</div>
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
          items={tasks.map((task) =>  task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {tasks.map((task) => (
              <SortableItem task={task} />
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
            <div className="cursor-grabbing rounded-md border-2 bg-white border-indigo-500 p-4 shadow-md 
            w-[70%]">
              <div className="flex items-center gap-4">
                <span className="text-gray-500"><GripHorizontal/></span>
                <span className="text-gray-500">{getActiveItem()}</span>
              </div>
            </div>
          ) : null}

          </DragOverlay>
      </DndContext>
    </div>
  );
}
