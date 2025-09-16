import Sidebar from "./Sidebar";
import Header from "./Header";
import Board from "./Board";
import { useState } from "react";

const HomePage = () => {
  const [view, setView] = useState("list");

  return (
    <>

      {/* Desktop View */}
      <div className="hidden md:flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-18 md:fixed md:left-0 md:top-0 md:h-full md:z-20">
          <Sidebar />
        </div>

        {/* Main Section */}
        <div className="flex-1 md:ml-18 flex flex-col">
          {/* Header */}
          <div className="relative md:sticky md:top-0 md:z-10">
            <Header selected={view} setSelected={setView} />
          </div>

          {/* Scrollable Content (Kanban board) */}
          <div className="flex-1 overflow-y-auto">
            <Board view={view} />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden">
        <div>
          <div>
            <Sidebar />
          </div>
          <Header selected={view} setSelected={setView} />
          <Board view={view} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
