// action, state, propsを設定して返す
import { useState } from "react";
import { DialogType } from "./DialogType";
import { DialogInputType } from "./DialogType";

type useDialogResult = {
  dialogProps: DialogType | null; // ダイアログに渡すprops全体の型
  openDialog: (pattern: "create" | "edit" | "delete") => void; // ボタンパターンを受け取るように変更
  closeDialog: () => void; // ダイアログを閉じる関数
};

const useDialog = (): useDialogResult => {
  const [dialogProps, setDialogProps] = useState<DialogType | null>(null);
  const [inputValue, setInputValue] = useState(""); // inputのvalueをここで管理することも検討

  //ダイアログのパターンをまとめているところ
  const inputConfigCreate: DialogInputType = {
    label: "カテゴリ名",
    type: "text",
    required: "required",
    value: inputValue, // inputValueはuseDialog内部で管理するか、呼び出し元から渡すか検討
    placeholder: "カテゴリ名を入力",
    buttonPattern: "create",
    onChange: (val) => {
      setInputValue(val.toString());
    },
  };
  const inputConfigEdit: DialogInputType = {
    label: "カテゴリ名",
    type: "text",
    required: "required",
    value: inputValue,
    placeholder: "カテゴリ名を入力",
    buttonPattern: "edit",
    onChange: (val) => setInputValue(val.toString()),
  };
  const inputConfigDelete: DialogInputType = {
    label: "カテゴリ名",
    type: "text",
    required: "required",
    value: inputValue,
    placeholder: "カテゴリ名を入力",
    buttonPattern: "delete",
    onChange: (val) => setInputValue(val.toString()),
  };

  const openDialog = (pattern: "create" | "edit" | "delete") => {
    let title = "";
    let inputConfig: DialogInputType;

    switch (pattern) {
      case "create":
        title = "カテゴリ作成";
        inputConfig = inputConfigCreate;
        break;
      case "edit":
        title = "カテゴリ編集";
        inputConfig = inputConfigEdit;
        break;
      case "delete":
        title = "カテゴリ削除";
        inputConfig = inputConfigDelete;
        break;
      default:
        // デフォルトの挙動やエラーハンドリング
        console.error("Unknown dialog pattern:", pattern);
        return;
    }
    setDialogProps({
      title: title,
      input: inputConfig,
      onClose: closeDialog,
    });
  };

  const closeDialog = () => {
    setDialogProps(null);
    setInputValue("");
  };

  return {
    dialogProps,
    openDialog,
    closeDialog,
  };
};

export default useDialog;
