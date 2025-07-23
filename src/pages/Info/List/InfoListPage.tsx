import { InfoListResDataType } from "../../../../../share/types/info/info.res.data";
import InfoListTable from "./components/InfoListTable";
import { Sidebar_ItemsType } from "../../../components/elements/Sidebar/Sidebar";
import Sidebar from "../../../components/elements/Sidebar/Sidebar";
import useFetchData from "../../../hooks/useFetchData";
import Spinner from "../../../components/elements/Spinner/Spinner";
import NoDataMessage from "../../../components/elements/NoDataMessage/NoDataMessage";
import { Link } from "react-router-dom";

const InfoListPage: React.FC = () => {
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

  // サイドバーに渡す項目を定義
  const sideBarItems: Sidebar_ItemsType = [
    { label: "新規", path: "/info/create" },
  ];
  console.log(data);

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
            <button>
              <Link
                to="/info/create"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300"
              >
                削除
              </Link>
            </button>
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
          <div className="absolute right-96">
            <div className="flex items-center space-x-4 mb-4 ">
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
        </div>

        {/* メインコンテンツ */}
        <div className="flex-1 p-6 mt-12">
          {data === null ? (
            <NoDataMessage message="インフォメーションが登録されていません" />
          ) : (
            <InfoListTable infos={data.infos} />
          )}
        </div>
      </div>
    </div>
    // おそらく今後詳細画面で使用することになる編集ボタン
    // <td className="border bg-white border-gray-300 px-4 py-2">
    //  <Link
    //    to={`/info/${info.id}/edit`}
    //    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300 whitespace-nowrap"
    //  >
    //   編集
    //  </Link>
    // </td>
  );
};

export default InfoListPage;
