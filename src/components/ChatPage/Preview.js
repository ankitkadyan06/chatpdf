import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "../assets/css/Preview.css"


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Preview = ({ viewSelectedPdf }) => {
  console.log({viewSelectedPdf});

  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <div className="preview-container">
      {viewSelectedPdf && (
        <Document file={viewSelectedPdf} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, page) => (
            <Page key={`page_${page + 1}`} pageNumber={page + 1}/>
          ))}
        </Document>
      )}
      
    </div>
  );
};

export default Preview;
