import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks, reOrderTask, updateTask } from "./app/tasks/taskSlice";
import Column from "./Column";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export default function Board() {
  const dispatch = useDispatch();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskUpdated = useSelector((state) => state.tasks.taskUpdated);

  // console.log(tasks)

  const [containers, setContainers] = useState(tasks);

  // console.log("tasks", tasks);

  useEffect(() => {
    if (tasks.length != 0) {
      setContainers(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch, taskUpdated]);

  function findContainerId(taskId) {
    if (containers.some((container) => container.id === taskId)) {
      return taskId;
    }

    return containers.find((container) =>
      container.tasks.some((task) => task.id === taskId)
    )?.id;
  }

  const handleDragStart = (e) => {
    setActiveId(e.active.id);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const activeContainerId = findContainerId(activeId);
    const overContainerId = findContainerId(overId);

    if (!activeContainerId || !overContainerId) {
      setActiveId(null);
      return;
    }

    if (activeContainerId === overContainerId && active.id !== over.id) {
      const containerIndex = containers.findIndex(
        (c) => c.id === activeContainerId
      );

      if (containerIndex === -1) {
        setActiveId(null);
        return;
      }

      const container = containers[containerIndex];
      const activeIndex = container.tasks.findIndex(
        (task) => task.id === active.id
      );
      const overIndex = container.tasks.findIndex(
        (task) => task.id === over.id
      );

      if (activeIndex !== -1 && overIndex !== -1) {
        const newTasks = arrayMove(container.tasks, activeIndex, overIndex);

        setContainers((containers) => {
          return containers.map((c, i) => {
            if (i === containerIndex) {
              return { ...c, tasks: newTasks };
            }
            return c;
          });
        });
      }

      /* console.log("activeIndex", activeContainerId);
      console.log("overIndex", overContainerId);
      console.log("Over Index, DragEnd", overIndex);
      const movedTask = container.tasks[activeIndex];
      console.log(movedTask);
      dispatch(
        reOrderTask({
          id: movedTask.id,
          updates: {
            newPosition: overIndex,
            status: activeContainerId,
            fromStatus: activeContainerId,
            toStatus: overContainerId,
          },
        })
      ); */
    }
    console.log(
      `End==> Task Card is moved from ${activeContainerId} to ${overContainerId}`
    );

    setActiveId(null);
  };

  function handleDragOver(e) {
    const { active, over } = e;

    console.log(e);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    console.log(activeId);
    console.log(overId);

    const activeContainerId = findContainerId(activeId);
    const overContainerId = findContainerId(overId);

    if (!activeContainerId || !overContainerId) return;

    if (activeContainerId === overContainerId && activeId !== overId) return;

    if (activeContainerId === overContainerId) return;

    setContainers((prev) => {
      const activeContainer = prev.find((c) => c.id === activeContainerId);

      if (!activeContainer) return prev;

      const activeTask = activeContainer.tasks.find(
        (task) => task.id === activeId
      );
      if (!activeTask) return prev;

      const newContainers = prev.map((container) => {
        if (container.id === activeContainerId) {
          return {
            ...container,
            tasks: container.tasks.filter((task) => task.id !== activeId),
          };
        }

        if (container.id === overContainerId) {
          if (overId === overContainerId) {
            // If the container is empty then simply just add the active task
            return {
              ...container,
              tasks: [...container.tasks, activeTask],
            };
          }

          // If container contains some Task, then adding accordingly w.r.t position
          const overTaskIndex = container.tasks.findIndex(
            (task) => task.id === over.id
          );

          // console.log("Over Task index", overTaskIndex+1);

          if (overTaskIndex !== -1) {
            return {
              ...container,
              tasks: [
                ...container.tasks.slice(0, overTaskIndex + 1),
                activeTask,
                ...container.tasks.slice(overTaskIndex + 1),
              ],
            };
          }
        }

        return container;
      });

      // console.log(
      //   `Task Card is moved from ${activeContainerId} to ${overContainerId}`
      // );

      /* const newContainer = newContainers.find((c) => c.id === overContainerId);
      const newIndex = newContainer.tasks.findIndex((t) => t.id === activeId);

      console.log("newIndex", newIndex);

      dispatch(
        reOrderTask({
          id: activeId,
          updates: {
            fromStatus: activeContainerId,
            toStatus: overContainerId,
            newPosition: newIndex,
            status: overContainerId,
          },
        })
      ); */

      return newContainers;
    });
  }

  return (
    <>
      {tasks.length == 0 ? (
        "Loading"
      ) : (
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragCancel={handleDragCancel}
          collisionDetection={closestCorners}
        >
          <div className="bg-white p-7">
            <div className="grid gap-4 md:grid-cols-3">
              {containers.map((container) => (
                <Column
                  key={container.id}
                  title={container.title}
                  droppableId={container.id}
                  tasks={container.tasks}
                  openDropdownId={openDropdownId}
                  onToggle={handleToggle}
                  setOpenDropdownId={setOpenDropdownId}
                />
              ))}
            </div>
          </div>
        </DndContext>
      )}
    </>
  );
}
