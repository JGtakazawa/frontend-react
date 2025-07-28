import { useParams } from "react-router-dom";
import InfoDetailList from "./components/InfoDetailList";
import { Sidebar_ItemsType } from "../../../components/elements/Sidebar/Sidebar";
import Sidebar from "../../../components/elements/Sidebar/Sidebar";
import useFetchData from "../../../hooks/useFetchData";
import { InfoDetailResDataType } from "../../../../../share/types/info/info.res.data";
import Spinner from "../../../components/elements/Spinner/Spinner";
import NoDataMessage from "../../../components/elements/NoDataMessage/NoDataMessage";

const InfoDetailPage: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams<{ id: string }>();

  // IDが存在するかチェック
  if (!id) {
    return (
      <div className="text-red-600 font-bold">
        Error: No ID found in the URL!
      </div>
    );
  }

  // データを取得
  const { data, error, isLoading } = useFetchData<InfoDetailResDataType>({
    url: `${API_URL}/api/info/${id}`,
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
    { label: "インフォメーション一覧", path: "/info" },
    { label: "インフォメーション登録", path: "/info/create" },
    { label: "インフォメーション編集", path: `/info/${id}/edit` },
  ];

  return (
    <div className="flex min-h-screen">
      {/* サイドバー */}
      <Sidebar items={sideBarItems} />

      {/* コンテンツ */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          インフォメーション詳細
        </h1>
        {data === null ? (
          <NoDataMessage message="インフォメーション詳細情報が見つかりませんでした" />
        ) : (
          <InfoDetailList
            info={data.info}
            files={data.infoFiles}
            urls={data.infoUrls}
          />
        )}
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

export default InfoDetailPage;
