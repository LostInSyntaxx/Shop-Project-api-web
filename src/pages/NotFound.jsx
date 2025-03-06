import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // ไอคอนกลับบ้านจาก react-icons

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
            <h1 className="text-6xl font-bold text-error">404</h1>
            <p className="text-lg text-gray-600 mt-2">Oops! Page not found.</p>
            <Link to="/" className="btn btn-primary mt-4 flex items-center gap-2">
                <FaHome />
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
