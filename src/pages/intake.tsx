import Form from "./forms/Form";
import menteeIntakeSchema from "src/pages/forms/MenteeIntake/schema.json";
import menteeIntakeUiSchema from "src/pages/forms/MenteeIntake/uischema.json";
import menteeIntakeData from "src/pages/forms/MenteeIntake/data.json";

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
