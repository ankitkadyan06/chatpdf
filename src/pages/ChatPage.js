import React from "react";
import SideBar from "../components/ChatPage/SideBar";
import Preview from "../components/ChatPage/Preview";
import ChatBot from "../components/ChatPage/ChatBot";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ChatPage = () => {
  const params = useParams();
  let defaultSelected = parseInt(params.selectedFile);
  const [selectedPdf, setSelectedPdf] = useState(defaultSelected);
  const [pdfData, setPdfData] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://61.246.6.48:8000/api/aigenerate/api/pdf_files/"
        );
        setPdfData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const selectedFileNameFromParams = params.fileName;
    setSelectedFileName(selectedFileNameFromParams);
  }, [params.fileName]);

  const data = {
    setSelectedPdf,
    selectedPdf,
    pdfData,
    defaultSelected,
    selectedFileName,
    setSelectedFileName,
  };

  return (
    <div className="flex md:flex-row flex-col w-full">
      <div className="w-full md:w-[15%]">
        <SideBar {...data} />
      </div>
      <div className="w-full md:w-[43%] h-[100vh] overflow-y-scroll">
        <Preview {...data} />
      </div>
      <div className="w-full md:w-[42%]">
        <ChatBot {...data} />
      </div>
    </div>
  );
};

export default ChatPage;
