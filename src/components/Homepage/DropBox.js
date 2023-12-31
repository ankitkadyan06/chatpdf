import React, { useState, useEffect } from "react";
import "../assets/css/DropBox.css";
import drop from "../assets/images/dropIcon.svg";
import Dropzone from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import newFolder from "../assets/images/newFolder.svg";
import deleteIcon from "../assets/images/delete.svg";
import threeDot from "../assets/images/threeDot.svg";
import chatIcon from "../assets/images/chatIcon.svg";
import deletePdf from "../assets/images/deletePdf.svg";
import rename from "../assets/images/rename.svg";
import moveTo from "../assets/images/moveTo.svg";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DropBox = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const navigate = useNavigate();

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);
      const response = await axios.post(
        "http://61.246.6.48:8000/api/aigenerate/api/upload_pdf/",
        formData
      );
      if (response.statusText === "Created") {
        axios
          .get("http://61.246.6.48:8000/api/aigenerate/api/pdf_files/")
          .then((res) => {
            // console.log(res.data)
            setSelectedFiles(res.data);
          });
      }
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  const handleFileUpload = async (acceptedFiles) => {
    for (const file of acceptedFiles) {
      await uploadFile(file);
    }
    setSelectedFiles([...selectedFiles, ...acceptedFiles]);
  };
  console.log(selectedFiles);

  useEffect(() => {
    axios
      .get("http://61.246.6.48:8000/api/aigenerate/api/pdf_files/", {})
      .then((res) => {
        setSelectedFiles(res.data);
      })
      .catch((error) => {
        return console.log(error);
      });
  }, []);

  const goToChat = (file, index) => {
    navigate(`/chat/${file.id}`, { state: { selectedFiles, index } });
  };

  const deleteFile = async (file) => {
    try {
      await axios.delete(
        `http://61.246.6.48:8000/api/aigenerate/api/pdf_files/${file.id}`
      );
      const response = await axios.get(
        "http://61.246.6.48:8000/api/aigenerate/api/pdf_files/"
      );
      if (response.message === "PDF file deleted successfully") {
        axios
          .get("http://61.246.6.48:8000/api/aigenerate/api/pdf_files/")
          .then((response) => {
            setSelectedFiles(response.data);
          })
          .catch((error) => {
            return console.log(error);
          });
      }
      const updatedFiles = selectedFiles.filter(
        (selectedFile) => selectedFile.id !== file.id
      );
      setSelectedFiles(updatedFiles);
    } catch (error) {
      console.error("Error deleting file", error);
    }
  };

  const renderSelectedFiles = () => {
    return selectedFiles.map((file, index) => {
      const lastChat = file.chat_messages ? file.chat_messages[file.chat_messages.length - 1] : null;
      return (
        <div
          key={index}
          className="w-[180px] h-[182px] ml-[10px] mt-[20px] border-[0.5px] border-solid border-[#E9E9E9] rounded-[5px] shadow"
        >
          <div>
            <div className="flex absolute z-[2] ml-[5px] mt-[5px]">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-[19px] h-[19px] cursor-pointer"
              />
              <div className="dropdown relative left-[340%]">
                <img src={threeDot} alt="" className="dropbtn" />
                <div className="dropdown-content bg-white w-[121px] rounded-[5px] pl-[10px] shadow-md">
                  <div className="flex cursor-pointer">
                    <img src={chatIcon} alt="" className="w-[16px]" />
                    <p className="text-[#313131] text-sm font-poppins ml-[10px] mt-[15px]">
                      Chat
                    </p>
                  </div>
                  <div
                    className="flex cursor-pointer"
                    onClick={() => deleteFile(file)}
                  >
                    <img src={deletePdf} alt="" className="w-[16px]" />
                    <p className="text-[#313131] text-sm font-poppins ml-[10px] mt-[5px]">
                      Delete
                    </p>
                  </div>
                  <div className="flex cursor-pointer">
                    <img src={rename} alt="" className="w-[16px]" />
                    <p className="text-[#313131] text-sm font-poppins ml-[10px] mt-[5px]">
                      Rename
                    </p>
                  </div>
                  <div className="flex cursor-pointer">
                    <img src={moveTo} alt="" className="w-[16px]" />
                    <p className="text-[#313131] text-sm font-poppins ml-[10px] mt-[5px]">
                      Move To
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Document file={"http://61.246.6.48:8000/" + file.file}>
              <Page pageNumber={1} />
            </Document>
          </div>
          <div
            className="relative h-[80px] z-[1] bg-[#F2F2F2] pl-[10px] pt-[10px] cursor-pointer"
            onClick={() => {
              goToChat(file, index);
            }}
          >
            <p
              className="text-[#0F8CFF] text-[14px] font-poppins mt-[10px]"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {file.name}
            </p>
            <p className="text-[#3B3B3B] text-[12px] font-poppins">
              {lastChat ? lastChat.response : "Start a conversation"}
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <Dropzone onDrop={handleFileUpload}>
        {({ getRootProps, getInputProps }) => (
          <section className="w-[82%] ml-[70px] md:ml-[100px] xl:ml-[130px]">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="DropBack w-full h-[203px] bg-white rounded-[22px] mt-[50px] px-[11px] py-[10px] cursor-pointer">
                <div className="w-full h-[181px] bg-[#E8F4FF] border-[2px] border-dashed border-[#0F8CFF] rounded-[22px]">
                  <div className="ml-[48%] mt-[17px] cursor-pointer">
                    <img src={drop} alt="" />
                  </div>
                  <p className="text-[#535353] text-center text-base font-poppins mt-[5px]">
                    Drop PDF here
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      <div className="flex justify-between mt-[-43px] ml-[157px] mr-[184px] relative">
        <label
          htmlFor="browse"
          className="text-[#0F8CFF] text-base font-poppins cursor-pointer"
        >
          Browse my Computer
        </label>
        <input type="file" className="hidden" id="browse" accept=".pdf" />
        <p className="text-[#0F8CFF] text-base font-poppins cursor-pointer">
          From URL
        </p>
      </div>
      {selectedFiles.length > 0 && (
        <div className="w-[82%] h-auto mb-[20px] bg-white rounded-[22px] ml-[70px] md:ml-[100px] xl:ml-[130px] mt-[50px] px-[11px] py-[10px]">
          <div className="flex justify-between">
            <div className="text-[#282828] text-[23px] font-poppins font-medium">
              My Chat
            </div>
            <div className="flex mr-[16px]">
              <div className="flex mr-[18px]">
                <button className="flex">
                  <img
                    src={newFolder}
                    alt=""
                    className="w-[20px] h-[16px] relative top-[3px]"
                  />
                  <p className="text-[#555555] hover:text-[#0F8CFF] text-base font-poppins ml-[10px]">
                    New Folder
                  </p>
                </button>
              </div>
              <div className="flex mr-[18px]">
                <button
                  className="flex"
                  onClick={() => console.log("Delete selected files")}
                >
                  <img
                    src={deleteIcon}
                    alt=""
                    className="w-[13px] h-[16px] relative top-[3px]"
                  />
                  <p className="text-[#555555] hover:text-[#C42222] text-base font-poppins ml-[10px]">
                    Delete
                  </p>
                </button>
              </div>
              <div className="flex">
                <button className="flex">
                  <input
                    type="checkbox"
                    name=""
                    id="select"
                    className="w-[16px] h-[16px] relative top-[3px] cursor-pointer"
                  />
                  <label
                    className="text-[#555555] hover:text-[#0F8CFF] text-base font-poppins ml-[10px] cursor-pointer"
                    htmlFor="select"
                  >
                    Select all
                  </label>
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {renderSelectedFiles()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropBox;
