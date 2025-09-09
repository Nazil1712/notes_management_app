import Sidebar from "./Sidebar";
import Header from "./Header";
import Board from "./Board";

const HomePage = () => {
  return (
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
  
        {/* Main Section */}
        <div className="flex-1">
          <Header />
  
          {/* Board */}
          <div className="">
            <Board/>
          </div>
        </div>
      </div>
    );
}

export default HomePage;
