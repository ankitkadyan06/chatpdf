import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import dfos from "../assets/images/dfosLogo.svg";
import "../assets/css/Sidebar.css";
import textImg from "../assets/images/textImg.svg";
import { useNavigate } from "react-router-dom";

const SideBar = ({ dropFile, setViewSelectedPdf, selectedPdf, setSelectedPdf }) => {
  const navigate = useNavigate();
  const [dataShow, setDataShow] = useState([]);
  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const newDataShow = [...dataShow];
      newDataShow[0].selectedFiles.push(acceptedFiles[0]);
      setDataShow(newDataShow);
    }
  };
console.log(selectedPdf)
  const handleClickPdf = (index) => {
    setSelectedPdf(index);
    // setViewSelectedPdf(dataShow[0].selectedFiles[index])
  };

  useEffect(() => {
    if (dropFile && !dataShow.includes(dropFile)) {
      setDataShow((prevDataShow) => [...prevDataShow, dropFile]);
    }
  }, [dropFile, dataShow]);

  console.log("dataShow", dataShow);
  console.log("dropFile", dropFile);

  return (
    <div className="bg-[#001529] h-[100vh]">
      <img
        src={dfos}
        alt=""
        className="ml-[20%] pt-[18px] pb-[17px] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      <hr className="border-[1px] border-solid border-[#CACACA] w-[90%] ml-[5%]" />

      <select
        name=""
        id=""
        className="w-[90%] py-[5px] px-[5px] text-white ml-[10px] rounded-[6px] border-[1px] border-solid border-[#D9D9D9] focus:outline-none bg-[#001529]"
      >
        <option value="" className="flex">
          My documents
        </option>
      </select>

      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="dropzone text-center border-[2px] border-dashed border-[#A9A9A9] rounded-[6px] w-[90%] h-[90px] ml-[10px] mt-[15px] cursor-pointer bg-[#2D445B]"
          >
            <input {...getInputProps()} />
            <p className="text-[16px] font-inter text-white">
              <span className="text-[25px]">+</span> New Chat
            </p>
            <p className="text-[#D9D9D9] text-base font-inter">Drop PDF here</p>
          </div>
        )}
      </Dropzone>
      {dataShow &&
        dataShow[0]?.selectedFiles?.map((item, index) => {
          return (
            <div
              key={index}
              className={`text-white ml-[10px] mt-4 flex rounded-[7px] px-[13px] mx-[10px] cursor-pointer ${
                selectedPdf === index ? "bg-[#1677FF]" : ""
              }`}
              onClick={() => handleClickPdf(index)}
            >
              <img src={textImg} alt="" />
              <p
                className="ml-[7px] mt-[10px]"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default SideBar;
