import { withJsonFormsControlProps } from '@jsonforms/react';
import { RadioButton } from 'primereact/radiobutton';

interface MultiRadioProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
}

const MultiRadio = ({ data, handleChange, path }: MultiRadioProps) => {
    console.log(data);
  return (
    <div>
      <h4>{data.title}</h4>
      {
        data.enum.map((option) => {
          return (
            <div key={option.key} className="field-radiobutton">
              <RadioButton inputId={option.key} name="category" value={option} onChange={(e) => handleChange(path, e.value)} checked={ === option.key} disabled={option.key === 'd'} />
              <label htmlFor={option}>{option.value}</label>
            </div>
          )
        })
      }
    </div>
  );
};

export default withJsonFormsControlProps(MultiRadio);