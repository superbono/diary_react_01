import React, { useState, useRef, useContext } from "react";
import { AppDispatchContext } from "../App";

const ListItem = ({ id, title, content, author, emotion, create_date }) => {
  const { onRemove, onEdit } = useContext(AppDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const [localContent, setLocalContent] = useState(content);

  const localInputTitle = useRef();
  const localInputContent = useRef();

  // useEffect(() => {
  //   console.log(`${id}번째 아이템렌더`);
  // }, []);

  const onRemoveItem = () => {
    console.log(`${id}번째 아이템삭제`);
    if (window.confirm(`이 게시물을 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const onEditToggle = () => {
    setIsEdit(!isEdit);
    console.log(`${id}번째 아이템수정`);
  };

  const onEditSave = () => {
    if (localTitle.length < 1) {
      localInputTitle.current.focus();
      return;
    } else if (localContent.length < 5) {
      localInputContent.current.focus();
      return;
    } else {
      if (window.confirm("수정하시겠습니까?")) {
        onEdit(id, localTitle, localContent);
        onEditToggle();
      }
    }
  };

  const onEditFormClear = () => {
    setIsEdit(false);
    setLocalTitle(title);
    setLocalContent(content);
    // setLocalState({ title: title, content: content });
  };

  return (
    <div className="listItem">
      <div>
        <div className="list_content">
          <div className="list_btn_box">
            {isEdit ? (
              <>
                <button className="delete" onClick={onEditFormClear}>
                  취소
                </button>
                <button className="save" onClick={onEditSave}>
                  저장
                </button>
              </>
            ) : (
              <>
                <button className="save" onClick={onEditToggle}>
                  수정
                </button>
                <button className="delete" onClick={onRemoveItem}>
                  삭제
                </button>
              </>
            )}
          </div>
          <div>
            제목 :{" "}
            {isEdit ? (
              <>
                <input
                  name="edit_title"
                  className="input_title"
                  type="text"
                  ref={localInputTitle}
                  onChange={(e) => {
                    setLocalTitle(e.target.value);
                  }}
                  value={localTitle}
                />
              </>
            ) : (
              <>
                <span>{title}</span>
              </>
            )}
          </div>
          <div>
            {isEdit ? (
              <div style={{ marginTop: 5 }}>
                <span className="content-label">내용 : </span>
                <textarea
                  name="edit_content"
                  ref={localInputContent}
                  className="input_content"
                  type="text"
                  value={localContent}
                  onChange={(e) => {
                    setLocalContent(e.target.value);
                  }}
                  style={{ padding: 0 }}
                />
              </div>
            ) : (
              <>
                <span>내용 : </span>
                <span>{content}</span>
              </>
            )}
          </div>
        </div>
        <div className="info">
          <span>
            작성자: {author} | 감정점수: {emotion}
          </span>
          <br />
          <span className="date">
            작성일자: {new Date(create_date).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ListItem);
