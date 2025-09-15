import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks, reOrderTask, updateTask } from "./app/tasks/taskSlice";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import KanbanBoard from "./KanbanBoard";
import RowView from "./RowView";
import TaskCard from "./TaskCard";

export default function Board({ view }) {
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState(null);

  const tasks = useSelector((state) => state.tasks.tasks);
  const taskUpdated = useSelector((state) => state.tasks.taskUpdated);

  // console.log(tasks)

  const [containers, setContainers] = useState(tasks);

  // console.log("Containers", containers);

  // console.log("tasks", tasks);

  useEffect(() => {
    if (tasks.length != 0) {
      setContainers(tasks);
    }
    console.log("Fetching ALL Task---------------------------------------")
  }, [tasks]);

  useEffect(() => {
    dispatch(fetchAllTasks());
    // console.log(`Fetching beacuse changes happened`)
  }, [dispatch, taskUpdated]);

  function findContainerId(taskId) {
    if (containers.some((container) => container.id === taskId)) {
      return taskId;
    }

    return containers.find((container) =>
      container.tasks.some((task) => task.id === taskId)
    )?.id;
  }

  const getActiveTask = () => {
    const activeContainerId = findContainerId(activeId);
    const activeContainer = containers.find((c) => c.id === activeContainerId);
    const activeTask = activeContainer.tasks.find(
      (task) => task.id === activeId
    );

    return activeTask;
  };

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
    console.log("Active Container Id in dragEnd ==>", activeContainerId);
    console.log("Over Container Id in dragEnd ==>", overContainerId);
    console.log("Active Id in dragEnd ==>",activeId)
    console.log("Over Id in dragEnd ==>",overId)

    if (!activeContainerId || !overContainerId) {
      setActiveId(null);
      return;
    }

    if (activeContainerId === overContainerId && active.id !== over.id) {
      const containerIndex = containers.findIndex(
        (c) => c.id === activeContainerId
      );

      console.log("Container Index in dragEnd ==>", containerIndex);

      if (containerIndex === -1) {
        setActiveId(null);
        return;
      }

      const container = containers[containerIndex]; // Finding the active Container
      const activeIndex = container.tasks.findIndex(
        (task) => task.id === active.id
      );
      console.log("Active Index in dragEnd ==>", activeIndex);
      const overIndex = container.tasks.findIndex(
        (task) => task.id === over.id
      );
      console.log("Over Index in dragEnd ==>", overIndex);

      if (activeIndex !== -1 && overIndex !== -1) {
        const newTasks = arrayMove(container.tasks, activeIndex, overIndex);
        console.log("Result By array move in dragEnd ==>", newTasks);

        setContainers((containers) => {
          return containers.map((c, i) => {
            if (i === containerIndex) {
              return { ...c, tasks: newTasks };
            }
            return c;
          });
        });

        const movedTask = container.tasks[activeIndex];
        console.log("***************** ===> id in dragEnd (Id) ",movedTask.id)
        console.log("***************** ===> Over Index in dragEnd (new Position) ",overIndex)
        console.log("***************** ===> Moved Task in dragEnd ",movedTask);
        console.log("***************** ===> Status in dragEnd (Status)",activeContainerId);

         console.log("***************** ===> active Container Id in dragEnd (fromStatus)", movedTask.status);
        console.log("***************** ===> Over container Id in dragEnd (toStatus)", overContainerId);
        
        dispatch(
          reOrderTask({
            id: movedTask.id,
            updates: {
              newPosition: overIndex,
              status: activeContainerId,
              fromStatus: movedTask.status,
              toStatus: overContainerId,
            },
          })
        );
      }

      // console.log(
      //   `End==> Task Card is moved from ${activeContainerId} to ${overContainerId}`
      // );
    }
    else{
      const containerIndex = containers.findIndex(
        (c) => c.id === activeContainerId
      );

      console.log("Active Container Id dragEnd ** Case 2",activeContainerId)
      console.log("Over Container Id dragEnd ** Case 2",overContainerId)

      // console.log("Container Index in dragEnd **Case 2==>", containerIndex);
      if (containerIndex === -1) {
        setActiveId(null);
        return;
      }

      const container = containers[containerIndex]; 

      const activeIndex = container.tasks.findIndex(
        (task) => task.id === active.id
      );
      // console.log("Active Index in dragEnd ==> **Case 2", activeIndex);

      const overIndex = container.tasks.findIndex(
        (task) => task.id === over.id
      );
      // console.log("Over Index in dragEnd ==> ** Case 2", overIndex);

      const movedTask = container.tasks[activeIndex];

      console.log("***************** ===> id in dragEnd (Id) ** Case 2",movedTask.id)
      console.log("***************** ===> Over Index in dragEnd (new Position) ** Case 2",overIndex)
      console.log("***************** ===> Moved Task in dragEnd ** Case 2",movedTask);
      console.log("***************** ===> Status in dragEnd (Status)** Case 2",activeContainerId);

      console.log("***************** ===> active Container Id in dragEnd (fromStatus)** Case 2", movedTask.status);
      console.log("***************** ===> Over container Id in dragEnd (toStatus)** Case 2", overContainerId);

      

      
      dispatch(
        reOrderTask({
          id: movedTask.id,
          updates: {
            newPosition: overIndex,
            status: activeContainerId,
            fromStatus: movedTask.status,
            toStatus: overContainerId,
          },
        })
      );
     
    }

    setActiveId(null);
  };

  function handleDragOver(e) {
    const { active, over } = e;

    // console.log(e);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // console.log(activeId);
    // console.log(overId);

    const activeContainerId = findContainerId(activeId);
    const overContainerId = findContainerId(overId);
    console.log("Active Container Id in dragOver ==>", activeContainerId);
    console.log("Over Container Id in dragOver ==>", overContainerId);

    if (!activeContainerId || !overContainerId) return;

    if (activeContainerId === overContainerId && activeId !== overId) return;

    if (activeContainerId === overContainerId) return;

    // console.log("I am in handleDragOver")

    setContainers((prev) => {
      const activeContainer = prev.find((c) => c.id === activeContainerId);
      // console.log("Active Container in dragOver ==> ",activeContainer)

      if (!activeContainer) return prev;

      const activeTask = activeContainer.tasks.find(
        (task) => task.id === activeId
      );
      // console.log("Active task in dragOver ==> ",activeTask)
      if (!activeTask) return prev;

      const newContainers = prev.map((container) => {
        if (container.id === activeContainerId) {
          return {
            ...container,
            tasks: container.tasks.filter((task) => task.id !== activeId),
          };
        }

        if (container.id === overContainerId) {
          // console.log("Over Id in dragOver ==> ",overId)
          // console.log("Over container Id in dragOver ==> ",overContainerId)
          if (overId === overContainerId) {
            // If the container is empty then simply just add the active task
            // console.log("Hi Iam inside miracle")
            return {
              ...container,
              tasks: [...container.tasks, activeTask],
            };
          }

          // If container contains some Task, then adding accordingly w.r.t position
          const overTaskIndex = container.tasks.findIndex(
            (task) => task.id === over.id
          );
          console.log("Over task index in dragOver ==> ", overTaskIndex);

          // console.log("Over Task index in dragOver ==> ", overTaskIndex+1);

          // if (overTaskIndex !== -1) {
          //   return {
          //     ...container,
          //     tasks: [
          //       ...container.tasks.slice(0, overTaskIndex + 1),
          //       activeTask,
          //       ...container.tasks.slice(overTaskIndex + 1),
          //     ],
          //   };
          // }
          if (overTaskIndex !== -1) {
            const newContainerContent = {
              ...container,
              tasks: [
                ...container.tasks.slice(0, overTaskIndex + 1),
                activeTask,
                ...container.tasks.slice(overTaskIndex + 1),
              ],
            };
            console.log("Over Container content in dragOver ==>", newContainerContent);
            return newContainerContent;
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

  // console.log("Active Id", activeId);

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
            {view == "list" ? (
              <KanbanBoard containers={containers} />
            ) : view == "row" ? (
              <RowView />
            ) : (
              <h1>Coming Soon....</h1>
            )}
          </div>

          <DragOverlay
            adjustScale={true}
            dropAnimation={{
              duration: 150,
              easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            }}
          >
            {activeId ? (
              <div className="cursor-grabbing rounded-2xl bg-white border-2 border-green-500 shadow-md">
                <TaskCard task={getActiveTask()} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </>
  );
}
