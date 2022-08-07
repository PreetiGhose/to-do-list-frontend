import React from "react";

const List = (props) => {
  return (
    <div>
      <li>
        <input type="checkbox" onClick={props.deleteItem}></input> {props.item}
      </li>
    </div>
  );
};

export default List;
