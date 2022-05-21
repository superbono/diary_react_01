import ListItem from "./ListItem";

const List = ({ list }) => {
  return (
    <div className="boardList">
      {/* <br />
      <h2>리스트</h2>
      <br /> */}
      <div>
        {list.map((item) => (
          <ListItem key={item.id} item={list} {...item} />
        ))}
      </div>
      <h5>
        <span>{list.length}</span>개의 리스트가 있습니다.
      </h5>
      <br />
    </div>
  );
};

List.defaultProps = {
  list: [],
};

export default List;
