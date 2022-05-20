import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";

function App() {
  const [state, setState] = useState({
    title: "",
    content: "",
    author: "",
    emotion: 1,
  });

  const onSubmit = (e) => {
    if (state.title === "" || state.content === "" || state.author === "") {
      alert("값이 없습니다.");
    } else {
      e.preventDefault();
      console.log(state);
      clearInput();
    }
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const clearInput = () => {
    setState({ title: "", content: "", author: "", emotion: 1 });
  };

  return (
    <div className="App">
      <Header />
      <form onSubmit={onSubmit}>
        <div className="container">
          <label>제목:</label>
          <input name="title" value={state.title} onChange={handleChange} />
        </div>
        <div className="container">
          <label style={{ verticalAlign: 110 }}>내용:</label>
          <textarea
            name="content"
            value={state.content}
            onChange={handleChange}
          />
        </div>
        <div className="container">
          <label>누구:</label>
          <input name="author" value={state.author} onChange={handleChange} />
        </div>
        <div className="container">
          <label>감정:</label>
          <select value={state.emotion} name="emotion" onChange={handleChange}>
            <option value={1}>1. 기분이 아주 안좋다.</option>
            <option value={2}>2. 기분이 안좋다.</option>
            <option value={3}>3. 그저그렇다.</option>
            <option value={4}>4. 기분이 좋다.</option>
            <option value={5}>5. 기분이 아주 좋다.</option>
          </select>
        </div>
        <div className="btn-container-submit">
          <button type="submit">저장하기</button>
        </div>
        <div className="btn-container-reset">
          <button type="button" onClick={clearInput}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
