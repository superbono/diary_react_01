import "./App.css";
import React, {
  // useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import Editor from "./components/Editor";
import List from "./components/List";
import Title from "./components/Title";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const create_date = new Date().getTime();
      const newItem = {
        ...action.data,
        create_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE":
      return state.filter((item) => item.id !== action.id);
    case "EDIT":
      return state.map((item) =>
        item.id === action.id
          ? {
              ...item,
              title: action.newItemTitle,
              content: action.newItemContent,
            }
          : item
      );
    default:
      return state;
  }
};

export const AppStateContext = React.createContext();
export const AppDispatchContext = React.createContext();

const App = () => {
  // setData((data) =>
  //   data.map((item) =>
  //     item.id === targetId
  //       ? { ...item, title: newItemTitle, content: newItemContent }
  //       : item
  //   )
  // );

  const [data, dispatch] = useReducer(reducer, []);
  // 상태변화를 처리할 함수 : reducer
  // 어떤 상태변화를 일으킬건지에 대한 정의(함수) : action
  // dispatch를 통해 reducer 함수 실행, reducer에서 적절한 action을 찾아 실행하는 구조.

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
    dispatch({ type: "INIT", data: initData });
    // setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  // const onStatusChanged = () => {
  //   status = !status;
  // };

  const onCreate = useCallback((title, content, author, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        title,
        content,
        author,
        emotion,
        id: ++data_id.current,
      },
    });

    // const create_date = new Date().getTime();
    // const newItem = {
    //   id: data_id.current,
    //   title,
    //   content,
    //   author,
    //   emotion,
    //   create_date,
    // };
    data_id.current += 1;
    // setData([newItem, ...data]);
    // setData((data) => [newItem, ...data]);
    // setData((data) => [newItem, ...data]);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRemove = useCallback((id) => {
    // const refreshData = data.filter((item) => item.id !== id);
    // setData(refreshData);
    dispatch({ type: "REMOVE", id });
    // setData((data) => data.filter((item) => item.id !== id));
  }, []);

  const onEdit = useCallback((id, newItemTitle, newItemContent) => {
    // setData(
    //   data.map((item) =>
    //     item.id === targetId
    //       ? { ...item, title: newItemTitle, content: newItemContent }
    //       : item
    //   )
    // );
    dispatch({ type: "EDIT", id, newItemTitle, newItemContent });
    // setData((data) =>
    //   data.map((item) =>
    //     item.id === targetId
    //       ? { ...item, title: newItemTitle, content: newItemContent }
    //       : item
    //   )
    // );
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  const getListAnalysis = useMemo(() => {
    // console.log("일기 분석중...");
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getListAnalysis;

  return (
    <AppStateContext.Provider value={data}>
      <AppDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <div style={{ border: ".5px solid #000" }}></div>
          <Title />
          {/* <div className="app-btn-container">
        {status ? (
          <button className="app-hidden" onClick={onStatusChanged}>
            작성폼접기
          </button>
        ) : (
          <button className="app-write" onClick={onStatusChanged}>
            글작성하기
          </button>
        )}
      </div> */}
          {/* {status ? (
              ) : (
                ""
              )} */}
          <div className="app-header">
            {/* <Editor onCreate={onCreate} /> */}
            <Editor />
          </div>

          <div style={{ float: "right", marginRight: -40 }}>
            <div style={{ marginRight: 200 }}>
              전체 일기 갯수 : {data.length}
            </div>
            <div style={{ marginRight: 200 }}>
              좋아요 감정 갯수 : {goodCount}
            </div>
            <div style={{ marginRight: 200 }}>
              나빠요 감정 갯수 : {badCount}
            </div>
            <div style={{ marginRight: 200 }}>좋아요 비율 : {goodRatio}%</div>
          </div>
          <div className="app-list">
            {/* <List list={data} onRemove={onRemove} onEdit={onEdit} /> */}
            <List />
          </div>
        </div>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export default App;
