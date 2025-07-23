// Dialog系で使用する型を定義する
export type DialogInputType = {
  title: string;
  label: string;
  required: "none" | "option" | "required"; // 入力フィールドの入力可否
  type: "date" | "text" | "tel" | "email"; // 入力フィールドのタイプ
  placeholder: string; // 入力フィールドのプレースホルダー
  buttonPattern: "create" | "edit" | "delete"; // 何のダイアログかによってのボタンパターン
  onChange: (val: string | number) => void;
};

export type DialogType = {
  inputValue: string;
  input: DialogInputType;
  onClose: () => void;
};
