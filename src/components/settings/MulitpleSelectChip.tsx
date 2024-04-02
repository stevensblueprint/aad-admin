import { type SetStateAction, type Dispatch, useState } from "react";
import { type Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, optionValue: readonly string[], theme: Theme) {
  return {
    fontWeight:
      optionValue.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelectChip = ({
  label,
  options,
  editMode,
  defaultValue,
  helperText,
  updateValue,
  error,
}: {
  label: string;
  options: string[];
  editMode: boolean;
  defaultValue: string[];
  helperText: string;
  updateValue: Dispatch<SetStateAction<string[]>>;
  error: boolean;
}) => {
  const theme = useTheme();
  const [optionValue, setOptionValue] = useState<string[]>(defaultValue);

  const handleChange = (event: SelectChangeEvent<typeof optionValue>) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const selectValues = typeof value === "string" ? value.split(",") : value;
    if (selectValues.length <= 3) {
      setOptionValue(selectValues);
      updateValue(selectValues);
    }
  };

  return (
    <div>
      <FormControl sx={{ width: 1 }} error={error}>
        <InputLabel>{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={optionValue}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          readOnly={!editMode}
        >
          {options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, optionValue, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default MultipleSelectChip;
