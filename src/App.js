import { useState } from "react";

export default function App() {
  const [itemsAdded, setItemsAdded] = useState([]);

  function handleAddItem(item) {
    setItemsAdded((items) => [...items, item])
  }

  // You can also just pass id like on handleCheckBox and vice versa
  function handleDeleteItem(item) {
    setItemsAdded((items) => items.filter(it => it.id !== item.id))
  }

  function handleCheckBox(id) {
    setItemsAdded((items) => items.map(it => it.id === id ? { ...it, packed: !it.packed } : it))
  }

  return (
    <div className="app">
      <h1>🗽 Far Away</h1>
      <Form onHandleAddItem={handleAddItem} />
      <PackingList itemsAdded={itemsAdded} onHandleDeleteItem={handleDeleteItem} onHandleCheckBox={handleCheckBox} />
      <Stats numItems={itemsAdded} />
    </div>
  );
}

function Form({ onHandleAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return
    const newItem = { quantity, description, packed: false, id: Date.now() }
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

function PackingList({ itemsAdded, onHandleDeleteItem, onHandleCheckBox }) {
  const [sortBy, setSortBy] = useState("input")
  let sortedItem;

  if (sortBy === "input") sortedItem = itemsAdded;

  if (sortBy === "description") {
    sortedItem = itemsAdded
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedItem = itemsAdded
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed)); // false (0) before true (1)
  }

  return (
    <div className="list">
      <ul>
        {
          sortedItem.map((item) =>
            <Item itemObj={item} key={item.id} onHandleDeleteItem={onHandleDeleteItem} onHandleCheckBox={onHandleCheckBox} />
          )
        }
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input Order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by Packed Status</option>
        </select>

      </div>
    </div>
  )
}

function Item({ itemObj, onHandleDeleteItem, onHandleCheckBox }) {
  return (
    <li>
      <input type="checkbox" value={itemObj.packed} onClick={() => onHandleCheckBox(itemObj.id)} />
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button onClick={() => onHandleDeleteItem(itemObj)}>❌</button>
    </li>
  )
}

function Stats({ numItems }) {
  if (!numItems.length) {
    return (
      <footer className="stats">
        <em>
          <p>Start packing the item. 🚀</p>
        </em>
      </footer>)
  }
  const numItem = numItems.length;
  const numPacked = numItems.filter(item => item.packed).length
  const percentage = numItem === 0 ? 0 : Math.round((numPacked / numItem) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? 'You got everything. You are ready to go. ✈️' :
          `You have ${numItem} items on your list, and you already packed ${numPacked} (${percentage} %).`}
      </em>
    </footer>
  );
}

