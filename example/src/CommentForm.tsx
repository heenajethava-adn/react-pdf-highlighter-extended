import React, { useState } from "react";

interface CommentFormProps {
  onSubmit: (input: string) => void;
  placeHolder?: string;
  value?: string;
}

const CommentForm = ({ onSubmit, placeHolder,value }: CommentFormProps) => {
  const [input, setInput] = useState<string>("");

  return (
    <form
      className="Tip__card"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(input);
      }}
      
    >
      <div>
        <textarea
          placeholder={placeHolder}
          value={input || value}
          autoFocus
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
      </div>
      <div style={{display:"flex", gap:"0.5rem", marginTop:"1rem"}}>
        <button type="submit" className="ok-btn">Save Changes</button>
        {/* <button className="cancel-btn">Cancel</button> */}
        {/* <input  /> */}
      </div>
    </form>
  );
};

export default CommentForm;
