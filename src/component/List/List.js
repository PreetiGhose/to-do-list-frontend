import React from "react";

const List = (props) => {
  const delItem = () => {
    props.deleteItem(props.id);
  };
  return (
    <div>
      <li>
        <input type="checkbox" onClick={delItem}></input> {props.item}
      </li>
    </div>
  );
};

export default List;
