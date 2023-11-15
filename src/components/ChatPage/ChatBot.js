import React, { useEffect, useState } from "react";
import "../assets/css/ChatBot.css";
import send from "../assets/images/send.svg";
import download from "../assets/images/downloadIcon.svg";
import share from "../assets/images/shareIcon.svg";
import edit from "../assets/images/editIcon.svg";
import reset from "../assets/images/resetIcon.svg";
import deleteChat from "../assets/images/chatDeleteIcon.svg";
import axios from "axios";

const ChatBot = ({ selectedPdf, pdfData }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messageData, setMessageData] = useState([]);

  let filteredFile =
    pdfData && pdfData.filter((element) => element.id === selectedPdf);
  console.log(filteredFile);
  const formatTimestamp = (timestamp) => {
    const formattedTimestamp = new Date(timestamp).toLocaleString();
    return formattedTimestamp;
  };



  const handleSendMessage = async () => {
    const data = {
      file: filteredFile[0].file,
      pdf_file_id: selectedPdf,
      question: inputMessage,
    };
    try {
      const response = await axios.post(
        "http://61.246.6.48:8000/api/aigenerate/api/chat_messages/create/",
        data
      );
      if (response.data.message === "Chat message saved successfully") {
        axios
          .get(
            `http://61.246.6.48:8000/api/aigenerate/api/pdf_files/${selectedPdf}`
          )
          .then((response) => {
            setMessageData(response.data.chat_messages);
            setInputMessage(""); // Clear the input area
          })
          .catch((error) => {
            console.log(error);
          });
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (selectedPdf) {
      axios
        .get(
          `http://61.246.6.48:8000/api/aigenerate/api/pdf_files/${selectedPdf}`
        )
        .then((response) => {
          setMessageData(response.data.chat_messages);
        })
        .catch((error) => {
          return console.log(error);
        });
    }
  }, [selectedPdf]);
  console.log(messageData);
  useEffect(() => {
    // Fetch initial messages when selectedPdf changes
    if (selectedPdf) {
      axios
        .get(
          `http://61.246.6.48:8000/api/aigenerate/api/pdf_files/${selectedPdf}`
        )
        .then((response) => {
          setMessageData(response.data.chat_messages);
          // Scroll to the bottom of the chat container
          scrollToBottom();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedPdf]);

  // Scroll to the bottom of the chat container whenever messageData changes
  useEffect(() => {
    scrollToBottom();
  }, [messageData]);

  const scrollToBottom = () => {
    // Use a ref to get the chat container element
    const chatContainer = document.getElementById('chatContainer');
    // Scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  return (
    <div id="chatContainer" className="h-[100vh] bg-white pt-[10px] overflow-y-scroll">
      <div className="flex justify-between w-full h-[66px] bg-white">
        <p className="text-[#001529] font-poppins text-[20px] font-medium mt-[18px] ml-[10px]">
          Chat
        </p>
        <div className="flex mr-[10px]">
          <img src={download} alt="" className="w-[16px] cursor-pointer" />
          <img
            src={share}
            alt=""
            className="w-[16px] ml-[10px] cursor-pointer"
          />
          <img
            src={edit}
            alt=""
            className="w-[20.955px] ml-[10px] cursor-pointer"
          />
          <img
            src={reset}
            alt=""
            className="w-[16px] ml-[10px] cursor-pointer"
          />
          <img
            src={deleteChat}
            alt=""
            className="w-[12.005px] ml-[10px] cursor-pointer"
          />
        </div>
      </div>
        {messageData.map((message, index) => (
          <div className="mb-[50px]">
          <div
            key={index}
            style={{ maxWidth: `${message.question.length * 14}px` }}
            className="h-auto bg-[#F3F3FF] border-[1px] border-solid border-[#EDEDFF] rounded-[5px] ml-[10px] p-[5px]"
          >
            <div className="text-[#333333] text-sm font-poppins">
              {message.question}
            </div>
            </div>
            <div className="flex justify-end mr-[10px] mt-[10px] mb-[10px]">
              <div className="bg-[#1677FF] rounded-[5px] w-[300px] p-[15px]">
                <div className="text-white text-sm font-poppins">
                  {message.response}
                  <div className="text-right">{formatTimestamp(message.timestamp)}</div>
                </div>
              </div>
            </div>
            </div>
          
        ))}
    
      <div className="fixed bottom-0 left-[58%] pl-[25px] pb-[10px] right-0 bg-white w-[43%]">
        <div className="flex justify-end mt-[5px]">
          <input
            type="text"
            placeholder="Ask anything"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
            className="w-full text-[#333333] px-2 py-1 rounded-[5px] border border-[#BCBCBC] focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#1677FF] text-white p-2 rounded-r-[5px] relative right-[34.5px]"
          >
            <img src={send} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
