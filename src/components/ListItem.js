const ListItem = ({
  id,
  title,
  content,
  author,
  emotion,
  create_date,
  itemRemove,
}) => {
  const onRemove = () => {
    // alert(id);
    if (window.confirm(`이 게시물을 삭제하시겠습니까?`));
    itemRemove(id);
  };

  return (
    <div className="listItem">
      <div>
        <div className="list_content">
          <div className="list_btn_box">
            <button>수정</button>
            <button onClick={onRemove}>삭제</button>
          </div>
          <div>
            제목 : <span className="list_title">{title}</span>
          </div>
          <div> 내용: {content}</div>
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
        {/* <Division /> */}
      </div>
    </div>
  );
};

export default ListItem;
