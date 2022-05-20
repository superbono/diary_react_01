import "./App.css";
import React, { useState } from "react";
import DiaryEditor from "./components/DiaryEditor";

function App() {
  const [state, setState] = useState({
    title: "",
    content: "",
    author: "",
    emotion: 1,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(state.title, state.content, state.author, state.emotion);
    clearInput();
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const clearInput = () => {
    setState({ title: "", content: "", author: "", emotion: 1 });
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
        <div>
          <select value={state.emotion} name="emotion" onChange={handleChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button type="submit">저장하기</button>
      </form>
    </div>
  );
}

export default App;
