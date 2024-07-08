import React from "react";
import type { ViewportHighlight } from "./react-pdf-highlighter-extended";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


import "./style/HighlightPopup.css";
import { CommentedHighlight } from "./types";

interface HighlightPopupProps {
  highlight: ViewportHighlight<CommentedHighlight>;
  editComment: (id: string) => void;
  deleteComment: (id: string) => void;
}

const HighlightPopup = ({ highlight, editComment, deleteComment }: HighlightPopupProps) => {
   const handleEdit = () => {
    editComment(highlight.id);
  };

  const handleDelete = () => {
    deleteComment(highlight.id);
  };
  return highlight.comment ? (
    <div className="Highlight__popup" >
      <div style={{textAlign:"right", marginBottom:"0.5rem"}}>
          <FontAwesomeIcon icon={faEdit} style={{ cursor: 'pointer' }} onClick={handleEdit}  />
          <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: 'pointer', marginLeft: '1rem' }} onClick={handleDelete}  />
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