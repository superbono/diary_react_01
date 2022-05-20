import "./App.css";
import React, { useState } from "react";
import DiaryEditor from "./components/DiaryEditor";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="App">
      <DiaryEditor />
      <form>
        <div>
          <input value={title} onChange={onChangeTitle} />
        </div>
        <div>
          <textarea value={content} onChange={onChangeContent} />
        </div>
        <div>
          <select>
            <option>1</option>
          </select>
        </div>
        <button type="submit">저장하기</button>
      </form>
    </div>
  );
}

export default App;
