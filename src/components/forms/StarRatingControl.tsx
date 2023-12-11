import { withJsonFormsControlProps } from "@jsonforms/react";
import StarRating from "./StarRating";

interface RatingControlProps {
  data: number;
  handleChange(path: string, value: unknown): void;
  path: string;
}

const RatingControl = ({ data, handleChange, path }: RatingControlProps) => (
  <StarRating
    value={data}
    updateValue={(newValue: number) => handleChange(path, newValue)}
  />
);

export default withJsonFormsControlProps(RatingControl);
