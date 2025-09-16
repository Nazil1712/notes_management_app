import React, { useState } from "react";
import Column from "./Column";

const KanbanBoard = ({containers}) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleToggle = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };
  

  return (
    <div className="grid gap-4 md:grid-cols-3 ">
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
  );
};

export default KanbanBoard;
