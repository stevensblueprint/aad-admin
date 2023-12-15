import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

interface StarRatingProps {
  value: number;
  updateValue(newValue: number): void;
}

export default function StarRating({ value, updateValue }: StarRatingProps) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            updateValue(newValue);
          }
        }}
      />
    </Box>
  );
}
