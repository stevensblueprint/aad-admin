import Form from "../components/forms/Form";
import menteeIntakeSchema from "~/components/forms/MenteeRegistration/schema.json";
import menteeIntakeUiSchema from "~/components/forms/MenteeRegistration/uischema.json";
import menteeIntakeData from "~/components/forms/MenteeRegistration/data.json";

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
