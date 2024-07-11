import React from "react";
import PdfList from "./PdfList";
import ViewPdf from "./ViewPdf";
import { BrowserRouter as Router,Routes,Route, } from "react-router-dom";

export default function App(){
  return (
        <Router>
          <Routes>
            <Route path="/" element={<PdfList/>} />
            <Route path="/:id" element={<ViewPdf/>} />
          </Routes>
        </Router>
  )
};

