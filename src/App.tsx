import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ResourceTable from "./components/ResourceTable";
import AddResourceForm from "./components/AddResourceForm";
import SaveButton from "./components/SaveButton";

type ResourceMap = { [resourceClass: string]: number };
export type CraftableData = { [item: string]: ResourceMap };

export const resourceClasses = [
  "PrimalItemResource_Wood_C",
  "PrimalItemResource_Thatch_C",
  "PrimalItemResource_Fiber_C",
  "PrimalItemResource_Stone_C",
  "PrimalItemResource_MetalIngot_C",
  "PrimalItemResource_ChitinPaste_C",
  "PrimalItemResource_Polymer_C",
  "PrimalItemResource_Crystal_C",
  "PrimalItemResource_Electronics_C",
  "PrimalItemConsumable_Narcotic_C",
  "PrimalItemResource_Gunpowder_C",
  "PrimalItemResource_Obsidian_C",
  "PrimalItemResource_Hide_C",
  "PrimalItemResource_BlackPearl_C",
  "PrimalItemResource_Chitin_C",
  "PrimalItemAmmo_SimpleBullet_C",
  "PrimalItemAmmo_SimpleRifleBullet_C",
  "PrimalItemResource_Flint_C",
  "PrimalItemResource_Oil_C",
];

export const displayResourceName = (res: string) =>
  res.replace(/^PrimalItemResource_/, "")
     .replace(/^PrimalItemConsumable_/, "")
     .replace(/^PrimalItemAmmo_/, "")
     .replace(/_C$/, "");

function App() {
  const [data, setData] = useState<CraftableData>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const loadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as CraftableData;
        setData(parsed);
        setSelectedItem(null);
      } catch {
        alert("Failed to parse JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div id="app">
      <Sidebar
        data={data}
        selectedItem={selectedItem}
        onSelectItem={setSelectedItem}
        onLoadFile={loadFile}
      />

      <div className="main">
        <h3>{selectedItem || "Select an item"}</h3>
        {selectedItem && (
          <>
            <ResourceTable
              data={data}
              setData={setData}
              selectedItem={selectedItem}
            />
            <AddResourceForm
              data={data}
              setData={setData}
              selectedItem={selectedItem}
            />
          </>
        )}
        <SaveButton data={data} />
      </div>
    </div>
  );
}

export default App;
