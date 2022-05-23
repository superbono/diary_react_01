import React, { useState, useEffect, useRef } from "react";

const Count01View = React.memo(({ count }) => {
  useEffect(() => {
    console.log("Update Count : " + count);
  });
  return <div>{count}</div>;
});

const Count02View = ({ obj }) => {
  useEffect(() => {
    console.log("Update Text : " + obj.count);
  });

  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;
};

const Memoized = React.memo(Count02View, areEqual);

const Optimize = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 30 }}>
      <div style={{ marginBottom: 20 }}>
        <Count01View count={count} />
        <span style={{ marginRight: 10 }}>Count_01</span>
        <button
          onClick={() => {
            setCount(count);
          }}
        >
          증가
        </button>
      </div>
      <div>
        <Memoized obj={obj} />
        <span style={{ marginRight: 10 }}>Count_02</span>
        <button
          onClick={() => {
            setObj({
              count: obj.count,
            });
          }}
        >
          증가
        </button>
      </div>
      <div style={{ marginBottom: 20 }}></div>
    </div>
  );
};

export default Optimize;
