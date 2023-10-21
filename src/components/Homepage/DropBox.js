import React, { useState } from "react";
import "../assets/css/DropBox.css";
import drop from "../assets/images/dropIcon.svg";
import Dropzone from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const DropBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (acceptedFiles) => {
    // You should handle PDF uploads here
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
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
        <div className="w-[82%] h-[300px] bg-white rounded-[22px] ml-[130px] mt-[50px] px-[11px] py-[10px]">
          <p className="text-[#282828] text-[23px] font-poppins font-medium">
            My Chat
          </p>
          <div
            className="w-[180px] h-[230px] border-[0.5px] border-solid border-[#E9E9E9] rounded-[5px] shadow cursor-pointer"
            onClick={() => {
              navigate("/chat");
            }}
          >
            <div>
              <Document file={URL.createObjectURL(selectedFile)}>
                <Page pageNumber={1} />
              </Document>
            </div>
            <div className="relative z-[1] bg-white ml-[10px] pt-[10px]">
              <p
                className="text-[#0F8CFF] text-[14px] font-poppins mt-[10px]"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {selectedFile.name}
              </p>
              <p className="text-[#3B3B3B] text-[12px] font-poppins">
                Updated Chat with PDF
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropBox;
