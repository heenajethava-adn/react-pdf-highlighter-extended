import React,{useState} from "react";
import PdfList from "./PdfList";
import ViewPdf from "./ViewPdf";
import Test from "./Test";
import { BrowserRouter as Router,Routes,Route, } from "react-router-dom";

export default function App(){
  const [showPdf,setShowPdf] = useState(false);
  const [pdfUrl,setPdfUrl] = useState("");

  const handleClick = (new_pdf_url : string) => {
    setPdfUrl(new_pdf_url);
    setShowPdf(!showPdf)
  }
  console.log("pdf_url",pdfUrl)
  return (
        // showPdf ? <ViewPdf pdf_url={pdfUrl} /> : 
        <Router>
          <Routes>
            <Route path="/" element={<PdfList/>} />
            <Route path="/:id" element={<ViewPdf/>} />
          </Routes>
        </Router>
  )
};

