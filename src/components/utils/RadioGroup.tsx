import { ChangeEvent, FC } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import uniqid from "uniqid";

interface RadioType {
  label: string;
  value: string;
}
interface Props {
  label: string;
  menu: RadioType[];
  onChnge: (e: ChangeEvent<HTMLInputElement>) => void;
}
const RowRadioButtonsGroup: FC<Props> = ({ label, menu, onChnge }) => {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onChnge}
      >
        {menu.map(({ label, value }) => (
          <FormControlLabel
            key={uniqid()}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RowRadioButtonsGroup;
