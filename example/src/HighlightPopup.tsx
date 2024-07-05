import React from "react";
import type { ViewportHighlight } from "./react-pdf-highlighter-extended";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


import "./style/HighlightPopup.css";
import { CommentedHighlight } from "./types";

interface HighlightPopupProps {
  highlight: ViewportHighlight<CommentedHighlight>;
}

const HighlightPopup = ({ highlight }: HighlightPopupProps) => {
  return highlight.comment ? (
    <div className="Highlight__popup" >
      <div style={{textAlign:"right"}}>
          <FontAwesomeIcon icon={faEdit} style={{ cursor: 'pointer' }}   />
          <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: 'pointer', marginLeft: '1rem' }}   />
        </div>
      <div>
      {highlight.comment}
      </div>
       
    </div>
  ) : (
    <div className="Highlight__popup">Comment has no Text</div>
  );
};

export default HighlightPopup;