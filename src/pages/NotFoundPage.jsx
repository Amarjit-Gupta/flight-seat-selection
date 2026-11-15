import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plane } from "lucide-react";
import { getThemeColors } from "../utils/colors";

const NotFoundPage = ({ darkMode }) => {

  const navigate = useNavigate();

  const { iconBoxClass, iconColor, headingText } = getThemeColors(darkMode);

  return (
    <div className={`flex min-h-[calc(100vh-90px)] items-center justify-center px-4 transition-colors duration-300 ${darkMode ? "bg-black" : "bg-slate-100"}`}>
      <div className="text-center">
        <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-slate-700 ${iconBoxClass}`}>
          <Plane size={32} className={iconColor} />
        </div>
        <h1 className={`text-8xl font-extrabold tracking-tight ${headingText}`}>
          404
        </h1>
        <h2 className={`mt-4 text-2xl font-bold ${headingText}`}>
          Page Not Found
        </h2>
        <button
          onClick={() => navigate("/")}
          className={`mt-8 flex mx-auto cursor-pointer items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-all duration-200 ${darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-slate-700 text-slate-700 hover:bg-slate-200"}`}
        >
          <ArrowLeft size={17} />
          Go To Home Page
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
