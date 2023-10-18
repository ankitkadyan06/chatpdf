import React, { useState } from "react";
import "../assets/css/DropBox.css";
import drop from "../assets/images/dropIcon.svg";
import Dropzone from "react-dropzone";
import { Worker ,Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";

const DropBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);
  const handleFileUpload = (acceptedFiles) => {
    console.log("Uploaded files:", acceptedFiles);
    // Assuming you want to save the selected file
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file from Browse:", file);
    // Assuming you want to save the selected file
    setSelectedFile(file);
  };

  return (
    <div>
      <Dropzone onDrop={handleFileUpload}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="DropBack w-[82%] h-[203px] bg-white rounded-[22px] ml-[130px] mt-[50px] px-[11px] py-[10px] cursor-pointer">
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
        <input
          type="file"
          className="hidden"
          id="browse"
          onChange={handleFileInputChange}
          accept=".pdf"
        />
        <p className="text-[#0F8CFF] text-base font-poppins cursor-pointer">
          From URL
        </p>
      </div>

      {selectedFile && (
        <div className="w-[82%] h-[220px] bg-white rounded-[22px] ml-[130px] mt-[50px] px-[11px] py-[10px]">
          <p className="text-[#282828] text-[23px] font-poppins font-medium">
            My Chat
          </p>
          <div className="w-[180px] h-[176px] border-[0.5px] border-solid border-[#E9E9E9] rounded-[5px] shadow">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js" >
          <Viewer
            fileUrl={URL.createObjectURL(selectedFile)}
            defaultScale={SpecialZoomLevel.PageFit}
          />
          </Worker>
          <p className="text-[#0F8CFF] text-[14px] font-poppins">
            {selectedFile.name}
          </p>
          <p className="text-[#3B3B3B] text-[12px] font-poppins">Updated Chat with pdf</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropBox;

// URL.createObjectURL(selectedFile)
