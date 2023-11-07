import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "../assets/css/Preview.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Preview = ({ viewPdf, selected_file }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  let filteredFile =
    viewPdf &&
    viewPdf.filter((element, index) => (element = index === selected_file));
  // console.log(filteredFile)
  return (
    <div id="preview-container">
      {filteredFile && (
        <Document file={filteredFile[0]} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, page) => (
            <Page size="A4" key={`page_${page + 1}`} pageNumber={page + 1} />
          ))}
        </Document>
      )}
    </div>
  );
};

export default Preview;
