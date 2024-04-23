import { api } from "~/utils/api";
import { type UISchemaElement } from "@jsonforms/core";
import { useState } from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css"; // Styling needed for JSON View

interface JsonViewPlusProps {
  jsonSchema: object;
  uiSchema: UISchemaElement;
}

const JsonViewPlus = ({ jsonSchema, uiSchema }: JsonViewPlusProps) => {
  const [jsonSchemaSrc, setJsonSchemaSrc] = useState(jsonSchema);
  const [uiSchemaSrc, setUiSchemaSrc] = useState(uiSchema);

  /* Idea: Maintain the whole JSON object for the jsonSchema and UISchema in state variables
     TODO: Create a helper function/use a library that puts edited field in the corresponding part of the JSON object
     TODO: Update the state json with new JSON object to re-render the whole form
  */

  return <div>Random</div>;
};

export default JsonViewPlus;
