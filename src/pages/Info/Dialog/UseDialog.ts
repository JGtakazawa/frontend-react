// action, state, propsを設定して返す
import { useState } from "react";
import { DialogInputType } from "./DialogType";

type useDialogResult = {
  inputValue: string;
  dialogProps: DialogInputType | null; // ダイアログに渡すprops全体の型
  openDialog: (pattern: "create" | "edit" | "delete") => void; // ボタンパターンを受け取るように変更
  closeDialog: () => void; // ダイアログを閉じる関数
};

const useDialog = (): useDialogResult => {
  const [dialogProps, setDialogProps] = useState<DialogInputType | null>(null);
  const [inputValue, setInputValue] = useState(""); // inputのvalueをここで管理することも検討

  //ダイアログのパターンをまとめているところ
  const inputConfigCreate: DialogInputType = {
    title: "カテゴリ作成",
    label: "カテゴリ名",
    type: "text",
    required: "required",
    placeholder: "カテゴリ名を入力",
    buttonPattern: "create",
    onChange: (val) => {
      setInputValue(val.toString());
    },
  };
  const inputConfigEdit: DialogInputType = {
    title: "カテゴリ編集",
    label: "カテゴリ名",
    type: "text",
    required: "required",
    placeholder: "カテゴリ名を入力",
    buttonPattern: "edit",
    onChange: (val) => setInputValue(val.toString()),
  };
  const inputConfigDelete: DialogInputType = {
    title: "カテゴリ削除",
    label: "カテゴリ名",
    type: "text",
    required: "required",
    placeholder: "カテゴリ名を入力",
    buttonPattern: "delete",
    onChange: (val) => setInputValue(val.toString()),
  };

  const openDialog = (pattern: "create" | "edit" | "delete") => {
    let inputConfig: DialogInputType;

    switch (pattern) {
      case "create":
        inputConfig = inputConfigCreate;
        break;
      case "edit":
        inputConfig = inputConfigEdit;
        break;
      case "delete":
        inputConfig = inputConfigDelete;
        break;
      default:
        // デフォルトの挙動やエラーハンドリング
        console.error("Unknown dialog pattern:", pattern);
        return;
    }
    setDialogProps(inputConfig);
  };

  const closeDialog = () => {
    setDialogProps(null);
    setInputValue("");
  };

  return {
    inputValue,
    dialogProps,
    openDialog,
    closeDialog,
  };
};

export default useDialog;
