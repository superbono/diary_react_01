import ListItem from "./ListItem";

const List = ({ list, onRemove, onEdit }) => {
  return (
    <div className="boardList">
      <div>
        {list.map((item) => (
          <ListItem
            key={item.id}
            item={list}
            {...item}
            itemRemove={onRemove}
            itemEdit={onEdit}
          />
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
