import React, { useState } from "react";
import { resourceClasses, displayResourceName } from "../App.tsx";
import type { CraftableData } from "../App.tsx";

interface AddResourceFormProps {
  data: CraftableData;
  setData: React.Dispatch<React.SetStateAction<CraftableData>>;
  selectedItem: string;
}

const AddResourceForm: React.FC<AddResourceFormProps> = ({ data, setData, selectedItem }) => {
  const [newResName, setNewResName] = useState("");
  const [newResAmt, setNewResAmt] = useState<number | "">("");

  const addResource = () => {
    const fullRes = resourceClasses.find(
      (cls) => displayResourceName(cls).toLowerCase() === newResName.toLowerCase()
    );
    if (!fullRes) {
      alert(`Invalid resource: "${newResName}"`);
      return;
    }
    setData((prev) => ({
      ...prev,
      [selectedItem]: { ...prev[selectedItem], [fullRes]: newResAmt as number },
    }));
    setNewResName("");
    setNewResAmt("");
  };

  return (
    <div className="add-resource">
      <input
        type="text"
        placeholder="Resource name"
        value={newResName}
        onChange={(e) => setNewResName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={newResAmt}
        onChange={(e) => setNewResAmt(e.target.value === "" ? "" : parseInt(e.target.value))}
      />
      <button onClick={addResource}>Add Resource</button>
    </div>
  );
};

export default AddResourceForm;
