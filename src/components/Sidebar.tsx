import React, { useState } from "react";
import type { CraftableData } from "../App";

interface SidebarProps {
  data: CraftableData;
  selectedItem: string | null;
  onSelectItem: (item: string) => void;
  onLoadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ data, selectedItem, onSelectItem, onLoadFile }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items by search term
  const filteredItems = Object.keys(data)
    .filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  const stripItemName = (item: string) => {
    const parts = item.split("_");
    return parts.length > 1 ? parts[1] : item;
  }

  return (
    <div className="sidebar">
      <h3>Craftable Items</h3>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: "5px", marginBottom: "10px", boxSizing: "border-box" }}
      />
      <button onClick={() => setSearchTerm("")} style={{ marginBottom: "10px" }}>Clear</button>
      <input type="file" onChange={onLoadFile} />
      <hr/>
      <ul>
        {filteredItems.map((item) => (
          <li
            key={item}
            className={item === selectedItem ? "selected" : ""}
            onClick={() => onSelectItem(item)}
          >
            {stripItemName(item)}
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default Sidebar;
