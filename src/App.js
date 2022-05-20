import "./App.css";
import React, { useState } from "react";
import DiaryEditor from "./components/DiaryEditor";

function App() {
  const [state, setState] = useState({
    title: "",
    content: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(state.title, state.content);
    clearInput();
  };

  const clearInput = () => {
    setState({ title: "", content: "" });
  };

  return (
    <div className="App">
      <DiaryEditor />
      <form onSubmit={onSubmit}>
        <div>
          <input
            value={state.title}
            onChange={(e) => {
              setState({ title: e.target.value, content: state.content });
            }}
          />
        </div>
        <div>
          <textarea
            value={state.content}
            onChange={(e) => {
              setState({ title: state.title, content: e.target.value });
            }}
          />
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
