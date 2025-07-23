import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-800 text-white py-4">
        <nav>
          <ul className="flex justify-center space-x-4 relative">
            <li className="absolute left-4 top-1/2 -translate-y-1/2">
              <span className="text-white">オリオン</span>
            </li>
            <li>
              <Link
                to="/"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                ダッシュボード
              </Link>
            </li>
            <li>
              <Link
                to="/info"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                インフォメーション
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                カレンダー
              </Link>
            </li>
            <li>
              <Link
                to="/info"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                文書管理
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                連絡
              </Link>
            </li>
            <li>
              <Link
                to="/info"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                プロファイル
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                ワークフロー
              </Link>
            </li>
            <li>
              <Link
                to="/info"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                スマートレビュー
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                ボイスノート
              </Link>
            </li>
            <li>
              <Link
                to="/info"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                採用
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow bg-gray-100">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; Strawberry 2024</p>
      </footer>
    </div>
  );
};

export default MainLayout;
