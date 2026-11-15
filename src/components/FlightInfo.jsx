import { Plane, CalendarDays } from "lucide-react";
import { formatDate } from "../utils/priceCalculator";
import { getThemeColors } from "../utils/colors";

const FlightInfo = ({ flight, darkMode }) => {
  
  const { cardClass, iconBoxClass, iconColor, headingText, mutedText, dividerLine } = getThemeColors(darkMode);

  const { from, fromCity, to, toCity, duration, date } = flight;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_320px]">
      <div className={`flex items-center justify-between gap-3 rounded-lg border p-5 shadow-sm transition-all duration-300 sm:px-8 ${cardClass}`}>
        <div className="min-w-0">
          <p className={`text-xl font-bold ${headingText}`}>{from}</p>
          <p className={`text-sm ${mutedText}`}>{fromCity}</p>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 px-2 mt-1.5">
          <div className="flex w-full items-center gap-2">
            <div className={`h-[2px] flex-1 ${dividerLine}`} />
            <Plane className={`shrink-0 ${iconColor}`} size={22} />
            <div className={`h-[2px] flex-1 ${dividerLine}`} />
          </div>
          <span className={`text-sm font-medium ${mutedText}`}>
            {duration}
          </span>
        </div>
        <div className="min-w-0 text-right">
          <p className={`text-xl font-bold ${headingText}`}>{to}</p>
          <p className={`text-sm ${mutedText}`}>{toCity}</p>
        </div>
      </div>
      <div
        className={`flex items-center gap-3 rounded-lg border p-5 shadow-sm transition-all duration-300 ${cardClass}`}
      >
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconBoxClass}`}>
          <CalendarDays size={22} className={iconColor} />
        </div>
        <div>
          <p className={`text-sm font-medium ${mutedText}`}>Travel Date</p>
          <p className={`mt-1 text-sm font-semibold ${headingText}`}>{formatDate(date)}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightInfo;
