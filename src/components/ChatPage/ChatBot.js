import React from "react";
import "../assets/css/ChatBot.css";
import send from '../assets/images/send.svg'
import download from '../assets/images/downloadIcon.svg'
import share from '../assets/images/shareIcon.svg'
import edit from '../assets/images/editIcon.svg'
import reset from '../assets/images/resetIcon.svg'
import deleteChat from '../assets/images/chatDeleteIcon.svg'

const ChatBot = () => {
  return (
    <div className="h-[100vh] bg-white pt-[10px]">
      <div className="flex justify-between w-full h-[66px] bg-white">
        <p className="text-[#001529] font-poppins text-[20px] font-medium mt-[18px] ml-[10px]">Chat</p>
        <div className="flex mr-[10px]">
          <img src={download} alt="" className="w-[16px] cursor-pointer" />
          <img src={share} alt="" className="w-[16px] ml-[10px] cursor-pointer" />
          <img src={edit} alt="" className="w-[20.955px] ml-[10px] cursor-pointer" />
          <img src={reset} alt="" className="w-[16px] ml-[10px] cursor-pointer" />
          <img src={deleteChat} alt="" className="w-[12.005px] ml-[10px] cursor-pointer" />
        </div>
      </div>
      <div className="w-[405px] h-auto bg-[#F3F3FF] border-[1px] border-solid border-[#EDEDFF] rounded-[5px] ml-[10px] pl-[10px] pt-[10px]">
        <p className="text-[#333333] text-sm font-poppins">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus
        </p>
        <ul className="arrow-list">
          <li>Lorem ipsum dolor sit amet, consectetur</li>
          <li>Lorem ipsum dolor sit amet, consectetur</li>
          <li>
            Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
            lacus
          </li>
        </ul>
      </div>
      <div className="flex justify-end mr-[10px] mt-[10px]">
        <div className="bg-[#1677FF] rounded-[5px] w-[368px] h-auto pt-[10px] pl-[5px]">
          <p className="text-white text-sm font-poppins">
            Lorem ipsum dolor sit amet, consectetur adipiscia
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 mb-[10px]">
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Ask anything"
            className="w-[37%] text-[#333333] px-2 py-1 rounded-[5px] border border-[#BCBCBC] focus:outline-none"
          />
          <button className="bg-[#1677FF] text-white p-2 rounded-r-[5px] relative right-[36px]">
            <img src={send} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
