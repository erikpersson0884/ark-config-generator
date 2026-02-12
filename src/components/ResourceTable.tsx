import React, { useState } from "react";
import { displayResourceName, resourceClasses } from "../App";
import type { CraftableData } from "../App";


interface ResourceTableProps {
  data: CraftableData;
  setData: React.Dispatch<React.SetStateAction<CraftableData>>;
  selectedItem: string;
}

const ResourceTable: React.FC<ResourceTableProps> = ({ data, setData, selectedItem }) => {
  const [editingRes, setEditingRes] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  const renameResource = (oldRes: string, newResDisplay: string) => {
    const fullNewRes = resourceClasses.find(
      (cls) => displayResourceName(cls).toLowerCase() === newResDisplay.toLowerCase()
    );
    if (!fullNewRes) {
      alert(`Invalid resource: "${newResDisplay}"`);
      return;
    }
    setData((prev) => {
      const newData = { ...prev };
      newData[selectedItem][fullNewRes] = newData[selectedItem][oldRes];
      delete newData[selectedItem][oldRes];
      return newData;
    });
    setEditingRes(null);
  };

  const updateAmount = (res: string, value: string) => {
    const num = parseInt(value);
    if (isNaN(num)) return;
    setData((prev) => ({
      ...prev,
      [selectedItem]: { ...prev[selectedItem], [res]: num },
    }));
  };

  const deleteResource = (res: string) => {
    setData((prev) => {
      const newData = { ...prev };
      delete newData[selectedItem][res];
      if (Object.keys(newData[selectedItem]).length === 0) {
        delete newData[selectedItem];
      }
      return newData;
    });
  };

  // Filter resources for autocomplete dropdown
  const filteredResources = resourceClasses.filter((cls) =>
    displayResourceName(cls).toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Resource</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data[selectedItem]).map(([res, amt]) => (
          <tr key={res}>
            <td>
              {editingRes === res ? (
                <div style={{ position: "relative" }}>
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={() => renameResource(res, inputValue)}
                    autoFocus
                  />
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      maxHeight: "150px",
                      overflowY: "auto",
                      background: "white",
                      border: "1px solid #ccc",
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      zIndex: 10,
                    }}
                  >
                    {filteredResources.map((cls) => (
                      <li
                        key={cls}
                        onMouseDown={() => renameResource(res, displayResourceName(cls))}
                        style={{ padding: "5px", cursor: "pointer" }}
                      >
                        {displayResourceName(cls)}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <span onClick={() => { setEditingRes(res); setInputValue(displayResourceName(res)); }}>
                  {displayResourceName(res)}
                </span>
              )}
            </td>

            <td
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateAmount(res, e.currentTarget.innerText)}
            >
              {amt}
            </td>

            <td>
              <button onClick={() => deleteResource(res)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResourceTable;
