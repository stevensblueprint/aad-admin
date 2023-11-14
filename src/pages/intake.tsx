/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { person } from "@jsonforms/examples";

// https://jsonforms.io/
// current AAD Form: https://forms.office.com/pages/responsepage.aspx?id=t5piMQcNikilfZtYTEzdYHjzwie7DY1CmFODRRLdrqlURUtNWThaMElZTVJIOTU4OUhYV0g5NVNGMyQlQCN0PWcu

// TODO: Place behind Auth http://localhost:3000/intake

const schema = person.schema;
const uischema = person.uischema;
const initialData = person.data;

export default function Intake() {
  const [data, setData] = useState(initialData);

  return (
    <div className="App">
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onChange={({ data, errors }) => setData(data)}
      />
    </div>
  );
}
