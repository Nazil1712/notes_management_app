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
    console.log("Active Container Id in dragEnd ==>",activeContainerId)
    console.log("Over Container Id in dragEnd ==>",overContainerId)

    if (!activeContainerId || !overContainerId) {
      setActiveId(null);
      return;
    }

    if (activeContainerId === overContainerId && active.id !== over.id) {
      const containerIndex = containers.findIndex(
        (c) => c.id === activeContainerId
      );

      console.log("Container Index",containerIndex)

      if (containerIndex === -1) {
        setActiveId(null);
        return;
      }

      const container = containers[containerIndex]; // Finding the active Container
      const activeIndex = container.tasks.findIndex(
        (task) => task.id === active.id
      );
      console.log("Active Index",activeIndex)
      const overIndex = container.tasks.findIndex(
        (task) => task.id === over.id
      );
      console.log("Over Index",overIndex)

      if (activeIndex !== -1 && overIndex !== -1) {
        const newTasks = arrayMove(container.tasks, activeIndex, overIndex);
        console.log("Result By array move",newTasks)

        setContainers((containers) => {
          return containers.map((c, i) => {
            if (i === containerIndex) {
              return { ...c, tasks: newTasks };
            }
            return c;
          });
        });

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

      // console.log(
      //   `End==> Task Card is moved from ${activeContainerId} to ${overContainerId}`
      // );
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
    console.log("Active Container Id in dragOver ==>",activeContainerId)
    console.log("Over Container Id in dragOver ==>",overContainerId)

    if (!activeContainerId || !overContainerId) return;

    if (activeContainerId === overContainerId && activeId !== overId) return;

    if (activeContainerId === overContainerId) return;

    // console.log("I am in handleDragOver")

    setContainers((prev) => {
      const activeContainer = prev.find((c) => c.id === activeContainerId);
      // console.log("Active Container",activeContainer)

      if (!activeContainer) return prev;

      const activeTask = activeContainer.tasks.find(
        (task) => task.id === activeId
      );
      // console.log("Active task",activeTask)
      if (!activeTask) return prev;

      const newContainers = prev.map((container) => {
        if (container.id === activeContainerId) {
          return {
            ...container,
            tasks: container.tasks.filter((task) => task.id !== activeId),
          };
        }

        if (container.id === overContainerId) {
          // console.log("Over Id",overId)
          // console.log("Over container Id",overContainerId)
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
          console.log("Over task index", overTaskIndex);

          // console.log("Over Task index", overTaskIndex+1);

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
            console.log("Over Container content",newContainerContent)
            return newContainerContent
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