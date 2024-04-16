// TODO: Abstract Editing window into separate component
// Skeleton code for saving local state
import { useState } from "react";
import JsonView from "react-json-view";

const FormEditor = () => {
  const [jsonData, setJsonData] = useState(initialJsonData);

  const onEdit = (edit) => {
    const updatedJson = { ...jsonData };
    // Implement logic to deeply set the edited value based on the edit.path or edit.name
    set(updatedJson);
  };

  const onSave = async () => {
    try {
      await apiCallToUpdateJson(jsonData); // Function to update JSON in your backend
      alert("Changes saved successfully!");
    } catch (error) {
      alert("Failed to save changes.");
    }
  };

  return (
    <div>
      <JsonView src={jsonData} onEdit={onEdit} />
      <button onClick={onSave}>Save Changes</button>
    </div>
  );
};
