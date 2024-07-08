import React, { MouseEvent, useEffect, useRef, useState } from "react";
import CommentForm from "./CommentForm";
import ContextMenu, { ContextMenuProps } from "./ContextMenu";
import ExpandableTip from "./ExpandableTip";
import HighlightContainer from "./HighlightContainer";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import {GhostHighlight, PdfHighlighter, PdfHighlighterUtils, PdfLoader, Tip, ViewportHighlight} from "./react-pdf-highlighter-extended";
import "./style/App.css";
import { testHighlights as _testHighlights } from "./test-highlights";
import { CommentedHighlight } from "./types";
import { useParams } from "react-router-dom";
const TEST_HIGHLIGHTS = _testHighlights;

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () => {
  return document.location.hash.slice("#highlight-".length);
};

const resetHash = () => {
  document.location.hash = "";
};

const ViewPdf = () => {
  const { id } = useParams();  
  const pdf_url = ""
  const [url, setUrl] = useState(pdf_url);
  const [highlights, setHighlights] = useState<Array<CommentedHighlight>>(
    TEST_HIGHLIGHTS[pdf_url] ?? [],
  );

  const [contextMenu, setContextMenu] = useState<ContextMenuProps | null>(null);
  const [pdfScaleValue, setPdfScaleValue] = useState<number | undefined>(
    undefined,
  );

  // Refs for PdfHighlighter utilities
  const highlighterUtilsRef = useRef<PdfHighlighterUtils>();
 
  // Click listeners for context menu
  useEffect(() => {
    const handleClick = () => {
      if (contextMenu) {
        setContextMenu(null);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [contextMenu]);

  const handleContextMenu = (
    event: MouseEvent<HTMLDivElement>,
    highlight: ViewportHighlight,
  ) => {
    event.preventDefault();

    setContextMenu({
      xPos: event.clientX,
      yPos: event.clientY,
      deleteHighlight: () => deleteComment(highlight.id, highlight),
      editComment: () => editComment(highlight.id, highlight),
    });
  };

  const addHighlight = (highlight: GhostHighlight, comment: string) => {
    console.log("Saving highlight", highlight);
    setHighlights([{ ...highlight, comment, id: getNextId() }, ...highlights]);
  };


  const editHighlight = (
    idToUpdate: string,
    edit: Partial<CommentedHighlight>,
  ) => {
    console.log(`Editing highlight ${idToUpdate} with `, edit);
    setHighlights(
      highlights.map((highlight) =>
        highlight.id === idToUpdate ? { ...highlight, ...edit } : highlight,
      ),
    );
  };

  const resetHighlights = () => {
    setHighlights([]);
  };

const saveHighlights = async () => {
  try {
    const response = await fetch(`http://localhost:8000/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'file_data':highlights}),  
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log('Highlights saved successfully!');
    alert('Highlights saved successfully!')

  } catch (error) {
    console.error('Error saving highlights:', error);
  }
};

 
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      let {file_data,file_url} = data;
      setUrl(file_url)
      if (file_data != null){
        file_data = JSON.parse(file_data)
        setHighlights(file_data);
      }
    } catch (error) {
      alert("The PDF was not found. We are redirecting you to our homepage.");
      window.location.replace('/')
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, []);


const editComment = (id: string, highlight: ViewportHighlight<CommentedHighlight>) => {
    if (!highlighterUtilsRef.current) return;

    const editCommentTip: Tip = {
      position: highlight.position,
      content: (
        <CommentForm
          placeHolder={highlight.comment}
          value={highlight.comment}
          onSubmit={(input) => {
            editHighlight(highlight.id, { comment: input });
            highlighterUtilsRef.current!.setTip(null);
            highlighterUtilsRef.current!.toggleEditInProgress(false);
          }}
        />
      ),
    };

    highlighterUtilsRef.current.setTip(editCommentTip);
    highlighterUtilsRef.current.toggleEditInProgress(true);
  };

const deleteComment = async (id: string, highlight: ViewportHighlight<CommentedHighlight>) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");

    if (confirmed) {
        setHighlights(highlights.filter((h) => h.id !== highlight.id));
    } else {
        console.log("Deletion cancelled by user");
    }
};



// const deleteComment = async (id: string, highlight: ViewportHighlight<CommentedHighlight>) => {
//   console.log("Deleting comment for highlight", highlight);

//   // Update state locally by filtering out the deleted highlight
//   setHighlights(highlights.filter(h => h.id !== id));

//   try {
//     // Send delete request to your backend API
//     const response = await fetch(`http://localhost:8000/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id }),  // Send the ID of the highlight to delete
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     console.log('Comment and highlight deleted successfully!');
//     alert('Comment and highlight deleted successfully!');

//   } catch (error) {
//     console.error('Error deleting comment and highlight:', error);
//   }
// };


  const getHighlightById = (id: string) => {
    return highlights.find((highlight) => highlight.id === id);
  };



  // Scroll to highlight based on hash in the URL
  const scrollToHighlightFromHash = () => {
    const highlight = getHighlightById(parseIdFromHash());

    if (highlight && highlighterUtilsRef.current) {
      highlighterUtilsRef.current.scrollToHighlight(highlight);
    }
  };

  // Hash listeners for autoscrolling to highlights
  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHighlightFromHash);
    };
  }, [scrollToHighlightFromHash]);

  return (
    <div className="App" style={{ display: "flex", height: "100vh" , flexDirection: "row-reverse"}}>
      <Sidebar
        highlights={highlights}
        resetHighlights={resetHighlights}
        saveHighlights={saveHighlights}
      />
      <div
        style={{
          height: "100vh",
          width: "75vw",
          overflow: "hidden",
          position: "relative",
          flexGrow: 1,
          margin: "1rem",
          borderRadius: "0.6rem"
        }}
      >
        <Toolbar setPdfScaleValue={(value) => setPdfScaleValue(value)} />
        <PdfLoader document={url}>
          {(pdfDocument) => (
            <PdfHighlighter
              enableAreaSelection={(event) => true}
              pdfDocument={pdfDocument}
              onScrollAway={resetHash}
              utilsRef={(_pdfHighlighterUtils) => {
                highlighterUtilsRef.current = _pdfHighlighterUtils;
              }}
              pdfScaleValue={pdfScaleValue}
              selectionTip={<ExpandableTip addHighlight={addHighlight} />}
              highlights={highlights}
              style={{
                height: "calc(100% - 41px)",
              }}
            >
              <HighlightContainer
                editHighlight={editHighlight}
                editComment={editComment}
                deleteComment={deleteComment}
                onContextMenu={handleContextMenu}
              />
            </PdfHighlighter>
          )}
        </PdfLoader>
      </div>

      {contextMenu && <ContextMenu {...contextMenu} />}
    </div>
    // <Test/>
  );
};

export default ViewPdf;