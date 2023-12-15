import Form from "../components/forms/Form";
import ratingSchema from "~/components/forms/CustomRatingTest/schema.json";
import ratingUiSchema from "~/components/forms/CustomRatingTest/uischema.json";
import ratingData from "~/components/forms/CustomRatingTest/data.json";

export default function Intake() {
  return (
    <div>
      <Form
        schema={ratingSchema}
        uischema={ratingUiSchema}
        initialData={ratingData}
      />
    </div>
  );
}
