import { Home, BarChart, Folder, Zap, Bell, Settings } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { icon: <img src="/Home.png" alt="" />, label: "Home" },
    { icon: <img src="/Progress.png" alt="" />, label: "Analytics" },
    { icon: <img src="/People.png" alt="" />, label: "User" },
    { icon: <img src="/Calendar.png" alt="" />, label: "Calendar" },
    { icon: <img src="/Thunder.png" alt="" />, label: "Tasks" },
    { icon: <img src="/Bell.png" alt="" />, label: "Notifications" },
  ];

  return (
    <div
      className="h-screen w-18 bg-white border-r border-gray-300 flex flex-col 
     items-center justify-between"
    >
      <div>
        <div className="mt-6">
          <div>
            <img src="/logo_bg.png" alt="" className="rounded-lg" />
            <img src="/S_Vector.png" alt="" className="relative bottom-7.5" />
          </div>
        </div>

        {/* Middle Navigation Icons */}
        
        <div className="flex flex-col space-y-6">
          {navItems.map((item) => (
            <button className="p-2 hover:bg-gray-100 rounded-4xl" key={item.label}>
              {item.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Settings + Profile */}
      <div className="flex flex-col items-center space-y-4 mb-5">
        <button className="p-2 hover:bg-indigo-100 rounded-lg">
          <img src="/Settings.png" alt="" />
        </button>
        {/* <img src="/avatar-40.png" alt="User" className="h-10 w-10 rounded-full border" /> */}
      </div>
    </div>
  );
}
