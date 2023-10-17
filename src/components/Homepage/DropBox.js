import React, { useState } from "react";
import "../assets/css/DropBox.css";
import drop from "../assets/images/dropIcon.svg";
import Dropzone from "react-dropzone";

const DropBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);

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
        <label htmlFor="browse" className="text-[#0F8CFF] text-base font-poppins cursor-pointer">
          Browse my Computer
        </label>
        <input
          type="file"
          className="hidden"
          id="browse"
          onChange={handleFileInputChange}
        />
        <p className="text-[#0F8CFF] text-base font-poppins cursor-pointer">
          From URL
        </p>
      </div>

      {selectedFile && (
        <div className="w-[82%] h-[220px] bg-white rounded-[22px] ml-[130px] mt-[50px] px-[11px] py-[10px]">
          <p className="text-[#282828] text-[23px] font-poppins font-medium">My Chat</p>
          <iframe title="preview"
            src={URL.createObjectURL(selectedFile)}
            width="20%"
            height="50%"
            frameBorder="0"
            />
            <p>{selectedFile.name}</p>
        </div>
      )}
    </div>
  );
};

export default DropBox;
