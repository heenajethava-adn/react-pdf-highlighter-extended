import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
let fileData = [];

const PdfList = (props) => {
  const { handleClick } = props;
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        fileData = data;
        setFileList(fileData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {fileList.map((file, idx) => (
        <Link
          to={`/${file.id}`}
          key={idx}
          style={{ textDecoration: "none", color: "#0e0e0e" }}
        >
          <div
            style={{
              padding: "1rem",
              border: "1px solid #d1cece",
              borderRadius: "0.75rem",
              width: "50%",
              margin: "auto",
              marginBottom: "2rem",
              marginTop: "2rem",
            }}
          >
            <p>
              <span style={{ fontWeight: "600" }}>PDF Name:</span>{" "}
              <span>{file.file_name}</span>
            </p>
            <p>
              <span style={{ fontWeight: "600" }}>PDF Url:</span>{" "}
              <span style={{ wordWrap: "break-word" }}>{file.file_url}</span>
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default PdfList;
