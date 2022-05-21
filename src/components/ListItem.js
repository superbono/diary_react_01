import React, { useState } from "react";

const ListItem = ({
  id,
  title,
  content,
  author,
  emotion,
  create_date,
  itemRemove,
  itemEdit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [localState, setLocalState] = useState({
    title: title,
    content: content,
  });

  const onRemove = () => {
    if (window.confirm(`이 게시물을 삭제하시겠습니까?`));
    itemRemove(id);
  };

  const onEdit = () => {
    itemEdit();
    setIsEdit(!isEdit);
  };

  const onEditSave = () => {
    alert("수정완료");
    setIsEdit(!isEdit);
  };

  //   const handleChange = (e) => {
  //     setLocalState({ ...localState, [e.target.name]: e.target.value });
  //   };

  return (
    <div className="listItem">
      <div>
        <div className="list_content">
          <div className="list_btn_box">
            {isEdit ? (
              <>
                <button onClick={onEditSave}>저장</button>
                <button onClick={onEdit}>취소</button>
              </>
            ) : (
              <>
                <button onClick={onEdit}>수정</button>
                <button onClick={onRemove}>삭제</button>
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
                  onChange={(e) => {
                    setLocalState(e.target.value);
                  }}
                  value={localState.title}
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
                  className="input_content"
                  type="text"
                  value={localState.content}
                  onChange={(e) => {
                    setLocalState(e.target.value);
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

export default ListItem;
