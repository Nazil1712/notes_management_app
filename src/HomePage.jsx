import Sidebar from "./Sidebar";
import Header from "./Header";
import Board from "./Board";
import { useState } from "react";

const HomePage = () => {
  const [view, setView] = useState("list");

  return (
      <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-18 z-20">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="flex-1 ml-18 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10">
          <Header selected={view} setSelected={setView}/>
        </div>

        {/* Scrollable Content (Kanban board) */}
        <div className="flex-1 overflow-y-auto ">
          <Board view={view} />
        </div>
      </div>
    </div>
    );
}

export default HomePage;
