// Dialog系で使用する型を定義する
export type DialogInputType = {
  buttonPattern: "create" | "edit" | "confirm" | "result"; // 何のダイアログかによってのボタンパターン
  title: string;
  type: "date" | "text" | "tel" | "email" | "flat"; // 入力フィールドのタイプ
  label?: string;
  required?: "none" | "option" | "required"; // 入力フィールドの入力可否
  placeholder?: string; // 入力フィールドのプレースホルダー
  content?: string; // ダイアログのタイプがflatの時に空いたところに設定する内容
};

export type DialogPropsType = {
  buttonPattern: "create" | "edit" | "confirm" | "result"; // 何のダイアログかによってのボタンパターン
  title: string;
  type: "date" | "text" | "tel" | "email" | "flat"; // 入力フィールドのタイプ
  onChange: (e: string | number) => void;
  label?: string;
  required?: "none" | "option" | "required"; // 入力フィールドの入力可否
  placeholder?: string; // 入力フィールドのプレースホルダー
  content?: string; // ダイアログのタイプがflatの時に空いたところに設定する内容
};

export type useDialogResult = {
  inputValue: string;
  dialogProps: DialogPropsType | null; // ダイアログに渡すprops全体の型
  isOpen: boolean;
  openDialog: (props: DialogInputType) => void; // ボタンパターンを受け取るように変更
  closeDialog: () => void; // ダイアログを閉じる関数
  nextDialog: (props: DialogInputType) => void;
};

export type DialogType = {
  inputValue: string;
  dialogProps: DialogPropsType | null;
  onClose: () => void; // キャンセルボタンを押した時に使う関数
  isOpen: boolean; //ダイアログの展開状態
  openDialog: (props: DialogInputType) => void; // ダイアログを開く関数
  nextDialogProps?: DialogInputType;
};
