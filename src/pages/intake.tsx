import Form from "../components/forms/Form";
import menteeIntakeSchema from "~/components/forms/MenteeIntake/schema.json";
import menteeIntakeUiSchema from "~/components/forms/MenteeIntake/uischema.json";
import menteeIntakeData from "~/components/forms/MenteeIntake/data.json";

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
