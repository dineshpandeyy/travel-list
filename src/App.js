const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 2, description: "Charger", quantity: 1, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <h1>🗽 Far Away</h1>
      <Logo />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div className="add-form">
      <h3>What do you need for your trip?</h3>
    </div>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {
          initialItems.map((item) =>
            <Item itemObj={item} />
          )
        }
      </ul>
    </div>
  )
}

function Item({ itemObj }) {
  return (
    <li>
      <span style={itemObj.packed ? {textDecoration: "line-through"} : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button>❌</button>
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

