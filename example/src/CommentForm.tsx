import React, { useState } from "react";

interface CommentFormProps {
  onSubmit: (input: string) => void;
  placeHolder?: string;
  value?: string;
}

const CommentForm = ({ onSubmit, placeHolder, value }: CommentFormProps) => {
  const [input, setInput] = useState<string>(value || "");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if input is empty or just whitespace
    if (!input.trim()) {
      alert("You haven't entered any comment.");
      return;
    }

    onSubmit(input);
  };

  return (
    <form className="Tip__card" onSubmit={handleSubmit}>
      <div>
        <textarea
          placeholder={placeHolder}
          value={input}
          autoFocus
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <button type="submit" className="ok-btn">
          Save Changes
        </button>
        {/* Additional buttons or inputs can be added here */}
      </div>
    </form>
  );
};

export default CommentForm;
