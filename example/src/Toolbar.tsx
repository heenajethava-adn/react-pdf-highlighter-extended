import React, { useState } from "react";
// import { faThList } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import "./style/Toolbar.css";

interface ToolbarProps {
  setPdfScaleValue: (value: number) => void;
}

const Toolbar = ({ setPdfScaleValue }: ToolbarProps) => {
  const [zoom, setZoom] = useState<number | null>(null);

  const zoomIn = () => {
    if (zoom) {
      if (zoom < 4) {
        setPdfScaleValue(zoom + 0.1);
        setZoom(zoom + 0.1);
      }
    } else {
      setPdfScaleValue(1);
      setZoom(1);
    }
  };

  const zoomOut = () => {
    if (zoom) {
      if (zoom > 0.2) {
        setPdfScaleValue(zoom - 0.1);
        setZoom(zoom - 0.1);
      }
    } else {
      setPdfScaleValue(1);
      setZoom(1);
    }
  };

  return (
    <div className="Toolbar">
      <div className="thumbnailControls">
         <button>
         <FontAwesomeIcon icon={faGripLines} style={{ cursor: 'pointer' }}   />
        </button>  
      </div>
      <div className="ZoomControls">
        <button onClick={zoomOut}>-</button>
        <button onClick={zoomIn}>+</button>
        {zoom ? `${(zoom * 100).toFixed(0)}%` : "Auto"}
      </div>
    </div>
  );
};

export default Toolbar;
