import { useContext } from "react";
import { AppStateContext } from "../App";
import ListItem from "./ListItem";

const List = () => {
  const appList = useContext(AppStateContext);
  return (
    <div className="boardList">
      <div>
        {appList.map((item) => (
          <ListItem key={item.id} {...item} />
        ))}
      </div>
      <h5>
        <span>{appList.length}</span>개의 리스트가 있습니다.
      </h5>
      <br />
    </div>
  );
};

List.defaultProps = {
  list: [],
};

export default List;
