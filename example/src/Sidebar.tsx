import React from "react";
import type { Highlight } from "./react-pdf-highlighter-extended";
import "./style/Sidebar.css";
import { CommentedHighlight } from "./types";

interface SidebarProps {
  highlights: Array<CommentedHighlight>;
  resetHighlights: () => void;
  saveHighlights: () => void;
}

const updateHash = (highlight: Highlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

declare const APP_VERSION: string;

const Sidebar = ({highlights,saveHighlights,resetHighlights}: SidebarProps) => {

  return (
    <div className="sidebar" style={{ width: "20vw", maxWidth: "500px" }}>
      {/* Description section */}
      <div className="description" style={{ padding: "1rem" }}>
        <div className="display:flex">
        <a href="http://localhost:3000/">
        <h4 style={{ marginBottom: "0" }}>
         Back to Home
        </h4>
        </a>
        
        </div>
        <h2 style={{ marginBottom: "0" }}>
         Menuetta POC
        </h2>
        

        <p style={{ fontSize: "0.7rem" }}>
         Description
        </p>  
    
         {highlights && highlights.length > 0 && (
        <div style={{ paddingTop: "0.5rem" }}>
          <button onClick={saveHighlights} className="sidebar__save">
            Save Changes
          </button>
        </div>
      )}
      </div>

      {/* Highlights list */}
      {highlights && (
        <ul className="sidebar__highlights">
          {highlights.map((highlight, index) => (
            <li
              key={index}
              className="sidebar__highlight"
              onClick={() => {
                updateHash(highlight);
              }}
            >
              <div>
                {/* Highlight comment and text */}
               
                {highlight.content.text && (
                  <blockquote style={{ marginTop: "0.5rem" }}>
                    {`${highlight.content.text.slice(0, 90).trim()}…`}
                  </blockquote>
                )}
                 

                {/* Highlight image */}
                {highlight.content.image && (
                  <div
                    className="highlight__image__container"
                    style={{ marginTop: "0.5rem" }}
                  >
                    <img
                      src={highlight.content.image}
                      alt={"Screenshot"}
                      className="highlight__image"
                    />
                  </div>
                )}
              
              </div>
              
                <div style={{display:"flex", marginTop:"1rem", justifyContent:"space-between"}}>
                  <div className="" >
                    <strong>{highlight.comment}</strong>
                  </div>
              
                  <div className="highlight__location" >
                     Page {highlight.position.boundingRect.pageNumber}
                  </div>
                </div>
            
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
