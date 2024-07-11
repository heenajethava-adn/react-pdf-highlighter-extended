import React from "react";
import type { Highlight } from "./react-pdf-highlighter-extended";
import "./style/Sidebar.css";
import { CommentedHighlight } from "./types";
// import {  faCommentAlt } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SidebarProps {
  highlights: Array<CommentedHighlight>;
  resetHighlights: () => void;
}

const updateHash = (highlight: Highlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

declare const APP_VERSION: string;

const Sidebar = ({ highlights, resetHighlights }: SidebarProps) => {
  return (
    <>
      <div
        className="sidebar"
        style={{ width: "20vw", maxWidth: "500px", marginRight: "1rem" }}
      >
        {/* Description section */}
        <div
          className="description"
          style={{ padding: "1rem", paddingBottom: "0rem" }}
        >
          <div
            className="comments-box"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <h3
              className="comments"
              style={{ margin: "0px", textAlign: "center", color: "#114a6d" }}
            >
              Comments
            </h3>
          </div>
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

                <div
                  style={{
                    display: "flex",
                    marginTop: "1rem",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <div className="comments-container">
                    <p className="valuable-com">
                      Your valuable comments are displayed below.
                    </p>

                    <div
                      dangerouslySetInnerHTML={{ __html: highlight.comment }}
                      style={{ wordWrap: "break-word" }}
                    />
                  </div>

                  <div className="highlight__location">
                    Page {highlight.position.boundingRect.pageNumber}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;
