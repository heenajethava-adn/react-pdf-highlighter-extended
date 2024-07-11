import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface CommentFormProps {
  onSubmit: (input: string) => void;
  placeHolder?: string;
  value?: string;
}

const modules = {
  toolbar: {
    container: [
      [{ header: ["1", "2", "3", "4", "5", "6"] }],
      [{ background: [] }],
      [{ color: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
    ],
  },
};

const formats = [
  "header",
  "background",
  "color",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "align",
  "link",
  "image",
];

const CommentForm = ({ onSubmit, placeHolder, value }: CommentFormProps) => {
  const [input, setInput] = useState<string>(value || "");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.trim()) {
      toast.info("You haven't entered any comment.");
      return;
    }

    onSubmit(input);
  };

  return (
    <form className="Tip__card" onSubmit={handleSubmit}>
      <ReactQuill
        theme="snow"
        placeholder={placeHolder}
        value={input}
        onChange={setInput}
        modules={modules}
        formats={formats}
      />
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "4rem" }}>
        <button type="submit" className="ok-btn">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
