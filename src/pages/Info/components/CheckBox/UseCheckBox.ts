import { useState } from "react";
import { UseCheckBoxResult } from "./CheckBoxType";

const useCheckBox = (): UseCheckBoxResult => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedIds, setIsCheckedIds] = useState<number[]>([]);
  const handleOnChange = (e: boolean, id?: number) => {
    setIsChecked(e);
    console.log("useCheckBox", e, id);
    if (id === undefined) return;
    //idを引数で受け取ったとき↓
    if (e === true) {
      setIsCheckedIds((prev) => [...prev, id]);
    } else {
      setIsCheckedIds((prev) =>
        prev.filter((removeCheckItem) => removeCheckItem !== id)
      );
    }
  };

  return {
    isChecked,
    handleOnChange,
    isCheckedIds,
  };
};
export default useCheckBox;
