import { type Form as FormData} from "../../schemas/menteeIntake/form.types";
import Form from "../components/forms/Form";
import intakeSchema from "/schemas/menteeIntake/form.schema.json";
import uiSchema from "/schemas/menteeIntake/uischema.json";



export default function Intake() {
  return (
      <Form
			// TODO: imported json is type any
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        schema={intakeSchema}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        uischema={uiSchema}
				initialData={{
					
				} as FormData}
      />
  );
}
