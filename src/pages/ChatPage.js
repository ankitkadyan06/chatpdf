import React from "react";
import SideBar from "../components/ChatPage/SideBar";
import Preview from "../components/ChatPage/Preview";
import ChatBot from "../components/ChatPage/ChatBot";
import { useLocation } from "react-router-dom";

const ChatPage = () => {
  const location = useLocation();
  let dropBoxFile = location.state;
  return (
    <div className="flex md:flex-row flex-col w-full">
      <div className="w-full md:w-[15%]">
        <SideBar dropFile={dropBoxFile} />
      </div>
      <div className="w-full md:w-[43%]">
        <Preview />
      </div>
      <div className="w-full md:w-[42%]">
        <ChatBot />
      </div>
    </div>
  );
};

export default ChatPage;
