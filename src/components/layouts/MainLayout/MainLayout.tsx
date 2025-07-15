import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white py-4">
                <nav>
                    <ul className="flex justify-center space-x-4">
                        <li>
                            <Link
                                to="/"
                                className="text-white hover:text-blue-300 transition duration-300"
                            >
                                ホーム
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
