import { useState } from "react";

export default function App() {
  const [itemsAdded, setItemsAdded] = useState([]);

  function handleAddItem(item) {
    setItemsAdded((items) => [...items, item])
  }

  function handleDeleteItem(item) {
    setItemsAdded((items) => items.filter(it => it.id !== item.id))
  }

  return (
    <div className="app">
      <h1>🗽 Far Away</h1>
      <Form onHandleAddItem= {handleAddItem}/>
      <PackingList itemsAdded= {itemsAdded} onHandleDeleteItem= {handleDeleteItem} />
      <Stats />
    </div>
  );
}

function Form( {onHandleAddItem} ) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if(!description) return 
    const newItem = {quantity, description, packed:false, id:Date.now()} 
    console.log(newItem)
    onHandleAddItem(newItem)
    setDescription("")
    setQuantity(1)
  }

  return (
    <form className="add-form" onClick={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) =>
          <option value={num} key={num}>{num}</option>
        )}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}></input>
      <button>Add</button>
    </form>
  );
}

function PackingList( {itemsAdded, onHandleDeleteItem}) {
  return (
    <div className="list">
      <ul>
        {
          itemsAdded.map((item) =>
            <Item itemObj={item} key={item.id} onHandleDeleteItem={onHandleDeleteItem} />
          )
        }
      </ul>
    </div>
  )
}

function Item({ itemObj, onHandleDeleteItem}) {
  return (
    <li>
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button onClick={() => onHandleDeleteItem(itemObj)}>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>Stats</em>
    </footer>
  );
}

