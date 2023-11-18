import Form from "./forms/Form";
import { person } from "@jsonforms/examples";

export default function Intake() {
  return (
    <div className="App">
      <Form
        schema={person.schema}
        uischema={person.uischema}
        initialData={person.data}
      />
    </div>
  );
}
