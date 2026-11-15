import { Plane } from "lucide-react";
import { seatLayouts } from "../data/seats";
import { getSeatClass, getThemeColors } from "../utils/colors";

const SeatMap = ({layoutType,onLayoutChange,seats,seatAssignments,selectedPassengerId,onSeatSelect,darkMode}) => {

  const {cardClass, subPanelClass, headingText, mutedText, dividerClass} = getThemeColors(darkMode);

  const layout = seatLayouts[layoutType] || seatLayouts["3-2"];

  const getSeat = (row, col) => seats?.find((s) => s.id === `${row}${col}`);

  const getAssignedPassenger = (seatId) =>Object.entries(seatAssignments)?.find(([_, s]) => s === seatId)?.[0];

  const handleSeatClick = (seat, isOccupied) => {
    if (!selectedPassengerId || isOccupied) return;
    onSeatSelect(seat);
  };

  const legendData = [
    { color: "bg-blue-50 border border-blue-400", label: "Available" },
    { color: "bg-green-500", label: "Free (₹0)" },
    { color: "bg-purple-500", label: "Premium (₹250)" },
    { color: "bg-orange-500", label: "Extra Legroom (₹350)" },
    { color: "bg-slate-500", label: "Occupied" },
    { color: "bg-blue-600", label: "Selected" }
  ];

  return (
    <div className={`rounded-lg border p-4 shadow-sm transition-all duration-300 sm:p-6 ${cardClass}`}>
      <div className="mb-5">
        <h2 className={`text-lg font-bold ${headingText}`}>Choose Seats</h2>
        <p className={`mt-1 text-sm ${mutedText}`}>Select a seat for the active passenger</p>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.keys(seatLayouts)?.map((type) => (
          <button
            key={type}
            onClick={() => onLayoutChange(type)}
            className={`flex-1 cursor-pointer rounded-lg border px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${layoutType === type? darkMode? "border-gray-100 bg-gray-100 text-gray-900 hover:bg-white": "border-slate-900 bg-slate-900 text-white hover:bg-slate-800": `${subPanelClass} ${mutedText} ${darkMode? "hover:border-gray-700 hover:text-gray-100": "hover:border-slate-300 hover:text-slate-900"}`}`}
          >
            {type} Configuration
          </button>
        ))}
      </div>

      <div className={`mx-auto w-full rounded-lg border px-3 pb-5 pt-5 transition-colors duration-300 sm:px-6 ${subPanelClass}`}>
        <div className="mb-6 flex flex-col items-center gap-2">
          <Plane size={30} className={mutedText} />
          <span className={`text-[10px] font-bold ${mutedText}`}>
            FRONT OF AIRCRAFT
          </span>
        </div>
        <div className="mb-3 flex items-center justify-center gap-2 sm:gap-3">
          {layout?.map((group, i) => (
            <div key={i} className={`flex flex-1 justify-center gap-1.5 sm:gap-2 ${i > 0 ? `border-l pl-2 sm:pl-3 ${dividerClass}` : ""}`}>
              {group?.map((col) => (
                <div
                  key={col}
                  className={`flex h-8 flex-1 items-center justify-center text-sm font-bold ${mutedText}`}
                >
                  {col}
                </div>
              ))}
            </div>
          ))}
          <div className="w-5 shrink-0 sm:w-7" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6]?.map((row) => (
            <div key={row} className="flex items-center justify-center gap-2 sm:gap-3">
              {layout?.map((group, i) => (
                <div key={i} className={`flex flex-1 justify-center gap-1.5 sm:gap-2 ${i > 0 ? `border-l pl-2 sm:pl-3 ${dividerClass}` : ""}`}>
                  {group?.map((col) => {
                    const seat = getSeat(row, col);
                    if (!seat) return <div key={col} className="h-9 flex-1" />;

                    const assigned = getAssignedPassenger(seat.id);
                    const isSelected = assigned === selectedPassengerId;
                    const isOccupied =seat.status === "occupied" ||(assigned && assigned !== selectedPassengerId);

                    return (
                      <button
                        key={seat.id}
                        disabled={isOccupied}
                        onClick={() => handleSeatClick(seat, isOccupied)}
                        className={`flex h-9 min-w-0 flex-1 items-center justify-center rounded-sm border text-[10px] font-bold transition-all duration-200 sm:h-10 sm:text-xs ${getSeatClass(seat, isSelected, isOccupied, darkMode)}`}
                      >
                        {seat.id}
                      </button>
                    );
                  })}
                </div>
              ))}
              <span className={`w-5 shrink-0 text-center text-sm font-bold sm:w-7 ${mutedText}`}>
                {row}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-3">
        {legendData?.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-sm ${item.color}`} />
            <span className={`text-xs font-medium ${mutedText}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
