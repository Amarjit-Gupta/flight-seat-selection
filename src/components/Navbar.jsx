import { Moon, Plane, Sun } from "lucide-react";
import user from "../assets/user.jpg";
import { useNavigate } from "react-router-dom";
import { getThemeColors } from "../utils/colors";

const Navbar = ({ darkMode, setDarkMode }) => {

  const navigate = useNavigate();

  const { headerClass, iconBoxClass, headingText, mutedText, logoBoxClass } = getThemeColors(darkMode);

  return (
    <div className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${headerClass}`}>
      <div className="mx-auto flex h-22 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg shadow-sm ${logoBoxClass}`}>
            <Plane size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${headingText}`}>Indigo</h1>
            <p className={`hidden text-[10px] font-bold sm:block ${mutedText}`}>FLIGHT SEAT SELECTION</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ${iconBoxClass}`}>
            <img src={user} alt="icon" className="h-full w-full object-cover" />
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border transition-all duration-300 ${darkMode? "border-gray-600 bg-gray-800 text-gray-100 hover:border-gray-700 hover:bg-gray-800": "border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-100"}`}
          >
            <span className={`transition-transform duration-500 ease-in-out ${darkMode ? "rotate-180" : "rotate-0"}`}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
