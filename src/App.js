import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import Editor from "./components/Editor";
import List from "./components/List";
import Title from "./components/Title";

function App() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const data_id = useRef(1);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((item) => {
      return {
        title: item.email,
        content: item.body,
        author: item.name,
        emotion: Math.trunc(Math.random() * 5 + 1),
        create_date: new Date().getTime(),
        id: data_id.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onStatusChanged = () => {
    setStatus(!status);
  };

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

  const onEdit = (targetId, newItemTitle, newItemContent) => {
    setData(
      data.map((item) =>
        item.id === targetId
          ? { ...item, title: newItemTitle, content: newItemContent }
          : item
      )
    );
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
