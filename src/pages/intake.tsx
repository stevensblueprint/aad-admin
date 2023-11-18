import Form from "./forms/Form";
import menteeIntakeSchema from "src/pages/forms/schemas/menteeIntakeSchema.json";
import menteeIntakeUiSchema from "src/pages/forms/schemas/menteeIntakeUiSchema.json";
import menteeIntakeData from "src/pages/forms/schemas/menteeIntakeData.json";

export default function Intake() {
  return (
    <div>
      <Form
        schema={menteeIntakeSchema}
        uischema={menteeIntakeUiSchema}
        initialData={menteeIntakeData}
      />
    </div>
  );
}
