export default function Stats({ numItems }) {
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