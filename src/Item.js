export default function Item({ itemObj, onHandleDeleteItem, onHandleCheckBox }) {
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