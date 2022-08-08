import "./App.css";
import React, { useEffect, useState } from "react";
import List from "./component/List/List";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, [newItem]);

  const handleChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myData = {
      itemName: newItem,
    };
    setNewItem("");

    const result = await fetch("http://localhost:3001/", {
      method: "POST",
      body: JSON.stringify(myData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const resultinJson = await result.json();
    setItems((prevValue) => [...prevValue, resultinJson]);
  };

  const fetchData = async () => {
    const result = await fetch("http://localhost:3001/", {
      method: "GET",
    });

    const jsonResult = await result.json();

    return setItems(jsonResult.data);
  };

  const deleteItem = (id) => {
    console.log(id);
    const delresult = fetch("http://localhost:3001/delete", {
      method: "POST",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(fetchData());
  };

  return (
    <div className="App container">
      <form className="form-group" onSubmit={handleSubmit}>
        <h1>To Do List</h1>
        <input
          className="form mb-3"
          placeholder="Enter item here"
          name="item"
          value={newItem}
          onChange={handleChange}
        ></input>
        <button className="btn btn-success ">Add</button>
      </form>
      <div className="list-Items">
        <ul>
          {items.map((item, id) => {
            return (
              <List
                item={item.name}
                key={item._id}
                id={item._id}
                deleteItem={deleteItem}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
