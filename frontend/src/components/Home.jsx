import React from "react";
import Sidebar from "../components/Sidebar";
import Prompt from "../components/Prompt";

const Home = () => {
  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white overflow-hidden">
      {/* Sidebar Code */}
      <div className="w-64 bg-[#232327]">
        <Sidebar />
      </div>

      {/* Prompt code  */}
      <div className="flex flex-1 flex-col w-full">
        <div className="flex-1 flex items-center justify-center">
          <Prompt />
        </div>
      </div>
    </div>
  );
};

export default Home;
