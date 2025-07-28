// action, state, propsを設定して返す
import { useState } from "react";
import {
  DialogInputType,
  DialogPropsType,
  useDialogResult,
} from "./DialogType";

const useDialog = (): useDialogResult => {
  const [inputValue, setInputValue] = useState(""); // ダイアログ内の入力値をここで管理する
  const [dialogProps, setDialogProps] = useState<DialogPropsType | null>(null); //ダイアログの色々な情報を保持している
  const [isOpen, setIsOpen] = useState(false); //ダイアログを展開するか閉じるかを管理する状態

  // ダイアログ内のテキストボックスの状態を管理するための状態
  const inputOnChange = (inputValue: string | number) =>
    setInputValue(inputValue.toString());

  const openDialog = (props: DialogInputType) => {
    const dialogProps: DialogPropsType = {
      ...props,
      onChange: inputOnChange,
    };
    setIsOpen(true);
    setDialogProps(dialogProps);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setInputValue("");
  };

  // これ要らないかも
  const nextDialog = (props: DialogInputType) => {
    closeDialog();
    openDialog(props);
  };

  return {
    inputValue,
    dialogProps,
    isOpen,
    openDialog,
    closeDialog,
    nextDialog,
  };
};

export default useDialog;
