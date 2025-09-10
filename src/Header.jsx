import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChevronRight,
  Search,
  Grid,
  Filter,
  List,
  Columns3,
  Rows,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
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

  const [selected, setSelected] = useState("list");

  return (
    <div className="w-full border-b border-gray-300 ">
      {/* Top row: Breadcrumb + Search + Avatars + Invite */}
      <div className="bg-light-background-color">
        <div className="flex items-center justify-between px-6 py-3">
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
              {[
                "https://i.pravatar.cc/32?img=1",
                "https://i.pravatar.cc/32?img=2",
                "https://i.pravatar.cc/32?img=3",
                "https://i.pravatar.cc/32?img=4",
                "https://i.pravatar.cc/32?img=5",
              ].map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="user"
                  className="h-8 w-8 rounded-full border-2 border-white"
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
      <div className="bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left Side: Title + Views */}
          <div className="flex items-center space-x-6">
            {/* Project Logo */}
            <div className="h-20 w-20 rounded-full p-3 bg-indigo-100">
              <img src="/Upper_Circle.png" alt="" />
              <img src="/Bottom_Circle.png" alt="" />
            </div>

            {/* Title & View Buttons */}
            <div className="flex flex-col gap-2 mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
                            ${
                              selected === id
                                ? "bg-white shadow h-8 rounded-full"
                                : "text-gray-600 hover:text-gray-800"
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
          {/* <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 rounded-lg hover:bg-gray-100">
              <Grid size={14} /> <span>Grid View</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 rounded-lg hover:bg-gray-100">
              <Filter size={14} /> <span>Filter</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 rounded-lg hover:bg-gray-100">
              <span>⇅</span> <span>Sort</span>
            </button>
            <button className="px-4 py-2 bg-button-blue hover:bg-indigo-700 text-white text-sm font-medium rounded-4xl">
              <span className="flex gap-2">
                Export Data <img src="/Export.png" alt="Upload symbol" />
              </span>
            </button>
          </div> */}
          <div className="flex flex-col items-center space-x-3">
            <div className="flex">
              {rightFilters.map(({ id, label, icon }) => (
                <button
                  key={id}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  {icon} <span>{label}</span>
                </button>
              ))}
            </div>

            <button className="px-4 py-3 bg-button-blue hover:bg-indigo-700 text-white text-sm font-medium rounded-4xl mt-2 ml-25">
              <span className="flex gap-2">
                Export Data <img src="/Export.png" alt="Upload symbol" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
