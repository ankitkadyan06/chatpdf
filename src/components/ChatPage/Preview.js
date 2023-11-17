import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "../assets/css/Preview.css";
import togglePreview from "../assets/images/togglePreview.svg";
import zoomIn from "../assets/images/zoomIn.svg";
import pdfReset from "../assets/images/pdfReset.svg";
import zoomOut from "../assets/images/zoomOut.svg";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Preview = ({ pdfData, selectedPdf, selectedFileName }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleZoomIn = () => {
    if (scale < 2.0) {
      setScale(scale + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (scale > 0.1) {
      setScale(scale - 0.1);
    }
  };

  let filteredFile =
    pdfData && pdfData.filter((element) => element.id === selectedPdf);
  console.log(filteredFile);
  return (
    <div>
      <div className="sticky-header">
        <div className="flex ml-[10px] mt-[18px]">
          <img src={togglePreview} alt="" className="w-[19px] h-[28px]" />
          <p className="text-[#001529] text-[20px] font-poppins font-medium ml-[9px]">
            {selectedFileName || "File Name"}
          </p>
        </div>
        <div className="flex mr-[10px] ml-[29%]">
          <img
            src={zoomIn}
            alt=""
            className="w-[16.442px] cursor-pointer"
            onClick={handleZoomIn}
          />
          <img
            src={pdfReset}
            alt=""
            className="w-[15px] ml-[10px] cursor-pointer"
          />
          <img
            src={zoomOut}
            alt=""
            className="w-[10.213px] ml-[10px] cursor-pointer"
            onClick={handleZoomOut}
          />
        </div>
      </div>
      <div id="preview-container">
        {filteredFile && (
          <Document
            file={"http://61.246.6.48:8000/" + filteredFile[0]?.file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from({ length: numPages }, (_, page) => (
              <Page size="A4" key={`page_${page + 1}`} pageNumber={page + 1}  scale={scale}  />
            ))}
          </Document>
        )}
      </div>
    </div>
  );
};

export default Preview;
