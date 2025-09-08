import Sidebar from "./Sidebar";
import Header from "./Header";
import Board from "./Board";

export default function App() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1">
        <Header />

        {/* Board */}
        <div className="p-6 bg-gray-100 min-h-screen">
          <Board/>
        </div>
      </div>
    </div>
  );
}
