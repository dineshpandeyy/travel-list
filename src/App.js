import { useState } from "react";
import Form from "./Form";
import PackingList from "./ParkingList";
import Stats from "./Stats";
import { Logo } from "./Logo"; // not a default export file 

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

  function handleClearList() {
    setItemsAdded([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onHandleAddItem={handleAddItem} />
      <PackingList itemsAdded={itemsAdded} onHandleDeleteItem={handleDeleteItem} onHandleCheckBox={handleCheckBox} onHandleClearList={handleClearList}/>
      <Stats numItems={itemsAdded} />
    </div>
  );
}



