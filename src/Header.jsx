import { ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ScrollableFilterBar from "./ScrollableFilterBar";
import { ExportButtonIcon } from "./helper";

export default function Header({ selected, setSelected }) {
  const views = [
    { id: "grid", label: "Grid View", icon: <img src="/Grid.png" alt="" /> },
    { id: "list", label: "List View", icon: <img src="/List.png" alt="" /> },
    {
      id: "column",
      label: "Column View",
      icon: <img src="/Column.png" alt="" />,
    },
    { id: "row", label: "Row View", icon: <img src="/Row.png" alt="" /> },
  ];

  const rightFilters = [
    { id: "grid", label: "Grid View", icon: <img src="/Grid.png" alt="" /> },
    { id: "filter", label: "Filter", icon: <img src="/Filter.png" alt="" /> },
    { id: "sort", label: "Sort", icon: <img src="/Sort.png" alt="" /> },
  ];

  // const [selected, setSelected] = useState("list");

  const avatarsList = [
    "/avatar-39.png",
    "/avatar-40.png",
    "/avatar-41.png",
    "/avatar-42.png",
    "/avatar-43.png",
    "/avatar-44.png",
    "/avatar-45.png",
  ];

  const [visibleCount, setVisibleCount] = useState(3); // default for mobile

  // Adjust visible avatars based on screen width
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(3); // sm and below
      } else if (window.innerWidth < 700) {
        setVisibleCount(5);
      } else {
        setVisibleCount(avatarsList.length);
      }
    };

    updateCount(); // run on mount
    window.addEventListener("resize", updateCount);

    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const extraCount = avatarsList.length - visibleCount;

  return (
    <div className="md:w-full md:border-b border-gray-300 ">
      {/* Top row: Breadcrumb + Search + Avatars + Invite */}
      <div className="bg-light-background-color">
        <div className="hidden md:flex items-center justify-between px-6 py-3">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-1 text-sm text-gray-500 gap-2">
            <span className="flex items-center space-x-1 gap-2">
              <span className="cursor-pointer hover:underline">
                <img src="/Home.png" alt="" className="w-4 h-4" />
              </span>
              <ChevronRight size={25} className="text-gray-300" />
            </span>
            <span className="flex items-center space-x-1">
              <span className="cursor-pointer hover:underline font-bold">
                Dashboard
              </span>
              <ChevronRight size={25} className="text-gray-300" />
            </span>
            <span className="flex items-center space-x-1">
              <span className="cursor-pointer hover:underline font-bold">
                Project
              </span>
              <ChevronRight size={25} className="text-gray-300" />
            </span>
            <span className="text-indigo-600 font-bold flex justify-center items-center gap-1">
              {" "}
              <img
                src="/Sphere.png"
                alt=""
                className="w-4 h-4 inline-block"
              />{" "}
              Project PlanetX
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {/* <Search className="h-5 w-5 text-gray-500 cursor-pointer" /> */}
            <div>
              <img src="/searchIcon.png" alt="" />
            </div>

            {/* Avatars */}
            <div className="flex -space-x-2">
              {avatarsList.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="user"
                  className="h-9 w-9 rounded-full border-2 border-white"
                />
              ))}
            </div>

            {/* Invite Button */}
            <button className="flex items-center space-x-1 px-3 py-1.5 hover:bg-gray-200 rounded-4xl text-sm font-medium border border-gray-300 ">
              <span>Invite</span>
              <span className="">
                <img src="/plusIcon.png" alt="" className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Second row: Title + Views + Right controls */}
      <div className="hidden md:bg-white md:flex md:items-center md:justify-between ml-7 mt-7 mr-7 mb-4">
        {/* Left Side: Title + Views */}
        <div className="hidden md:flex items-center gap-5 ">
          {/* Project Logo */}
          <div className="h-20 w-20 rounded-full p-3 bg-indigo-100">
            <img src="/Upper_Circle.png" alt="" />
            <img src="/Bottom_Circle.png" alt="" />
          </div>

          {/* Title & View Buttons */}
          <div className="flex flex-col gap-3 mb-4">
            <h1 className="text-3xl font-extrabold text-gray-800">
              Project PlanetX
            </h1>
            <div
              className="flex items-center gap-4 rounded-full bg-background-color 
              w-fit mx-auto text-sm font-medium p-1"
            >
              {views.map(({ id, label, icon }, i) => (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  className={`flex items-center gap-2 px-4 py-3 font-bold rounded-full transition-all cursor-pointer
                            ${
                              selected === id
                                ? "bg-white shadow-md h-10 rounded-full "
                                : "text-gray-600 hover:text-gray-800 "
                            }
                            ${i == 0 ? "ml-2" : ""}
                            ${i == views.length - 1 ? "mr-2" : ""}
                            `}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="hidden md:flex md:flex-col md:items-center gap-2">
          <div className="flex">
            {rightFilters.map(({ id, label, icon }) => (
              <button
                key={id}
                className="md:flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
              >
                {icon} <span>{label}</span>
              </button>
            ))}
          </div>

          <button className="px-4 py-3 bg-button-blue hover:bg-indigo-700 text-white text-sm font-medium rounded-4xl mt-2 ml-25">
            <span className="flex gap-2">
              Export Data 
              <ExportButtonIcon />
            </span>
          </button>
        </div>
      </div>

      {/* ************************************** */}
      {/* Mobile Header */}
      <div className="flex flex-col gap-5 md:hidden bg-gray-50 p-4 rounded-lg w-screen">
        {/* Left Side */}
        <div className="flex items-center gap-2 text-button-blue font-medium cursor-pointer">
          <ChevronLeft size={30} />
          <span className="font-bold">Back To Project</span>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-center justify-evenly">
          {/* Search Icon */}
          <div className="cursor-pointer">
            <img
              src="/searchIcon.png"
              alt="search"
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          {/* Avatars */}
          <div className="flex items-center -space-x-2 cursor-pointer">
            {avatarsList.slice(0, visibleCount).map((url, i) => (
              <img
                key={i}
                src={url}
                alt="user"
                className="h-12 w-12 rounded-full border-2 border-white"
              />
            ))}

            {/* Show "+X" only if not all avatars visible */}
            {extraCount > 0 && (
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-lg font-extrabold border-2 border-white">
                +{extraCount}
              </div>
            )}
          </div>

          {/* Invite Button */}
          <button className="flex items-center space-x-1 px-5 py-2 hover:bg-gray-200 rounded-3xl text-base font-bold border border-gray-300 text-gray-500 gap-2 cursor-pointer mr-15">
            <span>Invite</span>
            <img src="/plusIcon.png" alt="plus" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Logo + filters */}
      <div className="flex flex-col md:hidden gap-4 w-screen">
        <div className="mt-5 ml-5 flex flex-col gap-4">
          {/* <img src="/Upper_Circle.png" alt="" /> */}
          {/* <img src="/Bottom_Circle.png" alt="" /> */}
          <img src="Project_logo2.png" alt="" className="w-17 h-17" />

          <h1 className="text-2xl font-extrabold text-gray-800">
            Project PlanetX
          </h1>
        </div>
        <div className="flex ml-2 gap-2 ">
          {rightFilters.map(({ id, label, icon }) => (
            <button
              key={id}
              className="flex items-center space-x-1 px-3 py-1 text-base text-gray-600 rounded-lg hover:bg-gray-100 font-bold cursor-pointer"
            >
              {icon} <span>{label}</span>
            </button>
          ))}
        </div>
        <div>
          <ScrollableFilterBar />
        </div>
      </div>
    </div>
  );
}
