import "./App.css";
import React, { useState } from "react";
import DiaryEditor from "./components/DiaryEditor";

function App() {
  const [state, setState] = useState({
    title: "",
    content: "",
    author: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(state.title, state.content, state.author);
    clearInput();
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const clearInput = () => {
    setState({ title: "", content: "", author: "" });
  };

  return (
    <div className="App">
      <DiaryEditor />
      <form onSubmit={onSubmit}>
        <div>
          <input name="title" value={state.title} onChange={handleChange} />
        </div>
        <div>
          <textarea
            name="content"
            value={state.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <input name="author" value={state.author} onChange={handleChange} />
        </div>
        <button type="submit">저장하기</button>
      </form>
    </div>
  );
}

export default App;
