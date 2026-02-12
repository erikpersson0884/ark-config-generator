import React from "react";
import type { CraftableData } from "../App.tsx";

interface SaveButtonProps {
  data: CraftableData;
}

const SaveButton: React.FC<SaveButtonProps> = ({ data }) => {
  const saveJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "item_costs.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="save-btn" onClick={saveJSON}>
      Save JSON
    </button>
  );
};

export default SaveButton;
