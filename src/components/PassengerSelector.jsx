import { Minus, Plus, Users } from "lucide-react";
import { getThemeColors } from "../utils/colors";

const PassengerSelector = ({passengerCount,onPassengerCountChange,min = 1,max = 9,darkMode,}) => {

  const { cardClass, subPanelClass, iconBoxClass, iconColor, headingText, mutedText } = getThemeColors(darkMode);

  return (
    <div className={`rounded-lg border p-5 shadow-sm transition-all duration-300 ${cardClass}`}>
      <div className="mb-5 flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBoxClass}`}>
          <Users size={21} className={iconColor} />
        </div>
        <div>
          <h2 className={`text-lg font-bold ${headingText}`}>Passengers</h2>
          <p className={`text-sm ${mutedText}`}>Select number of passengers</p>
        </div>
      </div>
      <div className={`flex items-center justify-between rounded-lg border p-2 ${subPanelClass}`}>
        <button
          onClick={() =>passengerCount > min && onPassengerCountChange(passengerCount - 1)}
          disabled={passengerCount <= min}
          className={`flex h-10 w-10 items-center justify-center rounded-lg border cursor-pointer transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${darkMode? "border-gray-600 bg-gray-900 text-gray-100 hover:border-gray-700 hover:bg-gray-800": "border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-100"}`}
        >
          <Minus size={18} />
        </button>
        <div className="text-center">
          <p className={`text-2xl font-bold ${headingText}`}>
            {passengerCount}
          </p>
          <p className={`text-sm ${mutedText}`}>
            {passengerCount === 1 ? "Passenger" : "Passengers"}
          </p>
        </div>
        <button
          onClick={() =>passengerCount < max && onPassengerCountChange(passengerCount + 1)}
          disabled={passengerCount >= max}
          className={`flex h-10 w-10 items-center border justify-center rounded-lg cursor-pointer transition-all duration-300 disabled:cursor-not-allowed ${
            darkMode? "bg-gray-100 text-gray-900 hover:bg-white disabled:bg-gray-800 disabled:text-gray-500": "bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500"
          }`}
        >
          <Plus size={18} />
        </button>
      </div>
      <p className={`mt-3 text-sm ${mutedText}`}>
        You can select up to {max} passengers.
      </p>
    </div>
  );
};

export default PassengerSelector;
