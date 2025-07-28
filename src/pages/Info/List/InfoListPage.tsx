import { InfoListResDataType } from "../../../../../share/types/info/info.res.data";
import InfoListTable from "./components/Table/InfoListTable";
import { Sidebar_ItemsType } from "../../../components/elements/Sidebar/Sidebar";
import Sidebar from "../../../components/elements/Sidebar/Sidebar";
import useFetchData from "../../../hooks/useFetchData";
import Spinner from "../../../components/elements/Spinner/Spinner";
import NoDataMessage from "../../../components/elements/NoDataMessage/NoDataMessage";
import { Link } from "react-router-dom";
import Dialog from "./components/Dialog/Dialog";
import useDialog from "./components/Dialog/UseDialog";
import useCheckBox from "../components/CheckBox/UseCheckBox";
import { DialogInputType } from "./components/Dialog/DialogType";

const InfoListPage: React.FC = () => {
  const { inputValue, dialogProps, openDialog, closeDialog, isOpen } =
    useDialog();
  const { isChecked, handleOnChange } = useCheckBox();

  const API_URL = import.meta.env.VITE_API_URL;

  // データを取得
  const { data, error, isLoading } = useFetchData<InfoListResDataType>({
    url: `${API_URL}/api/info/`,
  });

  // 読み込み中
  if (isLoading) {
    return <Spinner />;
  }

  // エラーの場合
  if (error) {
    return <p className="text-red-600 font-semibold">Server Error: {error}</p>;
  }

  if (data === null) {
    return (
      <div className="flex-1 p-6 mt-0">
        <NoDataMessage message="インフォメーションが登録されていません" />
      </div>
    );
  }

  // ToDo: いずれはここで渡すのも改良する
  const sideBarItems: Sidebar_ItemsType = [
    // カテゴリ系のデータを渡す
  ];

  const infoDelete: DialogInputType = {
    buttonPattern: "confirm",
    title: "確認",
    type: "flat",
    content: "インフォメーションを削除しますが、よろしいですか？",
  };

  const nextDialogProps: DialogInputType = {
    buttonPattern: "result",
    title: "結果",
    type: "flat",
    content: "インフォメーションを更新しました。",
  };

  return (
    <div className="flex min-h-screen">
      {/* サイドバー */}
      <Sidebar items={sideBarItems} />
      <div className="flex-1 flex flex-col">
        {/* メインヘッダ */}
        <div className="w-full flex flex-row items-center justify-between mb-6 bg-white px-2 h-16">
          <h1 className="text-3xl font-normal text-gray-900  text-left bg-white">
            インフォメーション一覧
          </h1>
          <div className="flex space-x-2">
            <button>
              <Link
                to="/info/create"
                className="bg-white text-blue-600 font-bold px-4 py-2 rounded hover:bg-blue-500 border border-blue-600 transition duration-300"
              >
                新規
              </Link>
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              onClick={() => openDialog(infoDelete)}
            >
              削除
            </button>
            <div>
              <Dialog
                inputValue={inputValue}
                dialogProps={dialogProps}
                onClose={closeDialog}
                isOpen={isOpen}
                openDialog={openDialog}
                nextDialogProps={nextDialogProps}
              />
            </div>
          </div>
        </div>
        {/* ソート機能 */}
        <div className="flex flex-row space-x-4 ml-10">
          <div className="flex items-center space-x-4 mb-4">
            <label
              htmlFor="sortBy"
              className="text-sm font-medium text-gray-700"
            >
              表示：
            </label>
            <select
              id="sortBy"
              name="sortBy"
              className="px-3 py-2 border border-gray-300 rounded"
            >
              <option value="default">表示開始前</option>
              <option value="asc">表示中</option>
              <option value="desc">表示終了</option>
              <option value="desc">（すべて）</option>
            </select>
          </div>
          <div className="flex items-center  mb-4">
            <label
              htmlFor="sortBy"
              className="text-sm font-medium text-gray-700"
            >
              読了状況：
            </label>
            <select
              id="sortBy"
              name="sortBy"
              className="px-3 py-2 border border-gray-300 rounded"
            >
              <option value="default">未読</option>
              <option value="asc">既読</option>
              <option value="desc">（すべて）</option>
            </select>
          </div>
          <div className="flex items-center space-x-4 mb-4 absolute right-96 ">
            <select
              id="sortBy"
              name="sortBy"
              className="px-3 py-2 border border-gray-300 rounded"
            >
              <option value="default">タイトル</option>
              <option value="asc">作成者</option>
              <option value="desc">掲載期間</option>
            </select>
            <label className="text-sm font-medium text-gray-700">8件</label>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="flex-1 p-6 mt-0">
          <InfoListTable
            infos={data.infos}
            isChecked={isChecked}
            checkBoxChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoListPage;
