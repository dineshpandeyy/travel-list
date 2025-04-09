import { useState } from "react";
import Item from "./Item";

export default function PackingList({ itemsAdded, onHandleDeleteItem, onHandleCheckBox, onHandleClearList }) {
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
          <button onClick={onHandleClearList}>Clear list</button>
        </div>
      </div>
    )
  }