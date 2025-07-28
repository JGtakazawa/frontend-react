import React from "react";
import { CheckBoxProps } from "./CheckBoxType";

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  disabled,
  label,
  id,
}) => {
  return (
    <label className="inline-flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked, id)}
        disabled={disabled}
        className="form-checkbox h-4 w-4 text-blue-600"
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
};

export default CheckBox;
