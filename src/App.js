import "./App.css";
import React, { useState, useRef } from "react";
import Header from "./components/Header";

function App() {
  const [state, setState] = useState({
    title: "",
    content: "",
    author: "",
    emotion: 1,
  });
  const titleFocus = useRef();
  const contentFocus = useRef();
  const authorFocus = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (state.title.length < 1) {
      // alert("제목을 입력해주세요");
      titleFocus.current.focus();
      return;
    } else if (state.content.length < 4) {
      // alert("내용을 5자 이상 입력해주세요");
      contentFocus.current.focus();
      return;
    } else if (state.author.length < 2) {
      // alert("작성자를 입력해주세요");
      authorFocus.current.focus();
      return;
    } else {
      e.preventDefault();
      console.log(state);
      clearInput();
      alert("저장이 완료되었습니다.");
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
          <input
            name="title"
            className="input_title"
            ref={titleFocus}
            value={state.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />
        </div>
        <div className="container">
          <label style={{ verticalAlign: 110 }}>내용:</label>
          <textarea
            name="content"
            className="area_content"
            ref={contentFocus}
            value={state.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요."
          />
        </div>
        <div className="container">
          <label>누구:</label>
          <input
            name="author"
            className="input_author"
            ref={authorFocus}
            value={state.author}
            onChange={handleChange}
            placeholder="작성자를 입력하세요."
          />
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
