// Dialog系で使用する型を定義する
export type DialogInputType = {
  label: string;
  required: "none" | "option" | "required"; // 入力フィールドの入力可否
  type: "date" | "text" | "tel" | "email"; // 入力フィールドのタイプ
  value: string | number; // 入力フィールドの値
  placeholder: string; // 入力フィールドのプレースホルダー
  buttonPattern: "create" | "edit" | "delete"; // 何のダイアログかによってのボタンパターン
  onChange: (val: string | number) => void;
};

export type DialogType = {
  title: string;
  input: DialogInputType;
  onClose: () => void;
};
