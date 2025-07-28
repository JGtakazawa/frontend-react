export type CheckBoxProps = {
  checked: boolean;
  onChange: (checked: boolean, id?: number) => void;
  disabled: boolean;
  label?: string;
  id?: number;
};

export type UseCheckBoxResult = {
  isChecked: boolean;
  handleOnChange: (e: boolean, id?: number) => void;
  isCheckedIds: number[];
};
