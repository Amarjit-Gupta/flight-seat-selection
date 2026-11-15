import { Armchair } from "lucide-react";
import { getThemeColors } from "../utils/colors";

const legendItems = [
  { label: "Available", description: "Seat available for selection", color: "bg-blue-50 border border-blue-400" },
  { label: "Free (₹0)", description: "No additional charges", color: "bg-green-500" },
  { label: "Premium (₹250)", description: "Premium seat category", color: "bg-purple-500" },
  { label: "Extra Legroom (₹350)", description: "Additional legroom", color: "bg-orange-500" },
  { label: "Occupied", description: "Already assigned", color: "bg-slate-500" },
  { label: "Selected", description: "selected seat", color: "bg-blue-600" }
];

const SeatLegend = ({ darkMode }) => {

  const {cardClass, iconColor, headingText, mutedText} = getThemeColors(darkMode);

  return (
    <div className={`rounded-lg border p-5 shadow-sm transition-all duration-300 ${cardClass}`}>
      <div className="mb-4 flex items-center gap-2">
        <Armchair size={19} className={iconColor} />
        <h3 className={`text-sm font-bold ${headingText}`}>Seat Information</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {legendItems?.map((item) => (
          <div key={item.label} className="flex items-start gap-2.5">
            <span className={`mt-0.5 h-4 w-4 shrink-0 rounded ${item.color}`} />
            <div>
              <p className={`text-xs font-semibold ${headingText}`}>{item.label}</p>
              <p className={`mt-0.5 text-sm ${mutedText}`}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatLegend;
