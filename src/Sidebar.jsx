import { Home, BarChart, Folder, Zap, Bell, Settings, Menu } from "lucide-react";
import { useState } from "react";
import MobileNav from "./MobileNav";

export default function Sidebar() {
  const navItems = [
    { icon: <img src="/Home.png" alt="" />, label: "Home", active:true },
    { icon: <img src="/Progress.png" alt="" />, label: "Analytics", active:false },
    { icon: <img src="/People.png" alt="" />, label: "User", active:false },
    { icon: <img src="/Calendar.png" alt="" />, label: "Calendar", active:false },
    { icon: <img src="/Thunder.png" alt="" />, label: "Tasks", active:false },
    { icon: <img src="/Bell.png" alt="" />, label: "Notifications", active:false },
  ];


  const [open, setOpen] = useState(false);
  
  const handleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        className="hidden md:flex h-screen w-18 bg-white border-r border-gray-300 flex-col 
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

          <div className="flex flex-col gap-7">
            {navItems.map((item) => (
              <button
                className={`p-2 hover:bg-gray-100 rounded-4xl ${item.active? 'bg-gray-100' :''}`}
                key={item.label}
              >
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
          <img src="/avatar-40.png" alt="User" className="h-10 w-10 rounded-full border" />
        </div>
      </div>

      <div className="md:hidden flex w-screen items-center bg-white border-b border-gray-200 h-16 justify-between">
          <div className="flex">
            <div className="flex ml-5 mt-2">
              <img src="/Logomark2.png" className="w-14 h-14" alt="" />
            </div>
            <div className="flex items-center">
              <img src="/MobileLogo2.png" alt="" className="w-20" />
            </div>
          </div>
          <div className="mr-8 cursor-pointer" onClick={handleMenu}>
            <Menu size={32} color="#404040" />
          </div>

          <MobileNav open={open} handleMenu={handleMenu} />
        </div>
    </>
  );
}
