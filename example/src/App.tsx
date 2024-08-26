import React from "react";
import ViewPdf from "./ViewPdf";
import { BrowserRouter as Router,Routes,Route, } from "react-router-dom";
import ActionButtons from "./ActionButtons";

export default function App(){
  return (
        <Router>
         <div>
          <ActionButtons /> 
        <Routes>
          <Route path="viewproof" element={<ViewPdf />} />
        </Routes>
      </div>
        </Router>
  )
};

