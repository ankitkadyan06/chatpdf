import React from "react";
import SideBar from "../components/ChatPage/SideBar";
import Preview from "../components/ChatPage/Preview";
import ChatBot from "../components/ChatPage/ChatBot";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const ChatPage = () => {
  const location = useLocation();
  let dropBoxFile = location.state;
  let viewSelectedPdf = location.state.index;
  let viewPdf = location.state.selectedFiles;
  const [selectedPdf, setSelectedPdf] = useState(viewSelectedPdf);

  let data = {
    setSelectedPdf,
    selectedPdf,
  };
  return (
    <div className="flex md:flex-row flex-col w-full">
      <div className="w-full md:w-[15%]">
        <SideBar dropFile={dropBoxFile} {...data} />
      </div>
      <div className="w-full md:w-[43%] h-[100vh] overflow-y-scroll">
        <Preview viewPdf={viewPdf} selected_file={selectedPdf} />
      </div>
      <div className="w-full md:w-[42%]">
        <ChatBot />
      </div>
    </div>
  );
};

export default ChatPage;
