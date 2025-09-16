import { X } from "lucide-react"; // icon alternative to fontawesome

const MobileNav = ({open, handleMenu}) => {

  return (
    <div
      id="nav-dialog"
      className={`${open ? "fixed" : "hidden"} bg-white inset-0 p-3 lg:hidden z-20`}
    >
      {/* Navbar */}
      <div id="nav-bar" className="flex justify-between">
        <div className="flex items-center">
            <div className="flex ml-2">
              <img src="/Logomark2.png" className="w-14 h-14" alt="" />
            </div>
            <div className="flex items-center">
              <img src="/MobileLogo2.png" alt="" className="w-20 mb-2"/>
            </div>
          </div>

        <button
          className="mr-6 lg:hidden cursor-pointer"
          onClick={handleMenu}
        >
          <X className="text-gray-600" size={32} />
        </button>
      </div>

      {/* Links */}
      <div className="mt-6">
        {["Home", "Analytics", "User", "Calendar", "Tasks", "Notifications"].map((item) => (
          <a
            key={item}
            href="#"
            className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
