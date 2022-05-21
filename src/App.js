import "./App.css";
import React, { useState, useRef } from "react";
import Editor from "./components/Editor";
import List from "./components/List";
import Title from "./components/Title";

// const dummyList = [
//   {
//     id: 1,
//     title: "test1",
//     content: "test1의 내용입니다.",
//     author: "작성자1",
//     emotion: 3,
//     create_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     title: "test2",
//     content: "test2의 내용입니다.",
//     author: "작성자2",
//     emotion: 2,
//     create_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     title: "test3",
//     content: "test3의 내용입니다.",
//     author: "작성자3",
//     emotion: 5,
//     create_date: new Date().getTime(),
//   },
//   {
//     id: 4,
//     title: "test4",
//     content: "test4의 내용입니다.",
//     author: "작성자4",
//     emotion: 4,
//     create_date: new Date().getTime(),
//   },
//   {
//     id: 5,
//     title: "test5",
//     content: "test5의 내용입니다.",
//     author: "작성자5",
//     emotion: 1,
//     create_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);

  const onStatusChanged = () => {
    setStatus(!status);
  };

  const data_id = useRef(1);

  const onCreate = (title, content, author, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      id: data_id.current,
      title,
      content,
      author,
      emotion,
      create_date,
    };
    data_id.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (id) => {
    const refreshData = data.filter((item) => item.id !== id);
    setData(refreshData);
  };

  const onEdit = () => {
    console.log("edit");
  };

  return (
    <div className="App">
      <Title />
      <div className="app-btn-container">
        {status ? (
          <button className="app-hidden" onClick={onStatusChanged}>
            작성폼접기
          </button>
        ) : (
          <button className="app-write" onClick={onStatusChanged}>
            글작성하기
          </button>
        )}
      </div>
      {status ? (
        <div className="app-header">
          <Editor onCreate={onCreate} />
        </div>
      ) : (
        ""
      )}

      <div className="app-list">
        <List list={data} onRemove={onRemove} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default App;
