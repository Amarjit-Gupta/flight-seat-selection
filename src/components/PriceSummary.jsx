import { Armchair, IndianRupee, ArrowRight, Users } from "lucide-react";
import { formatPrice, getPassengerSeat } from "../utils/priceCalculator";
import { getThemeColors } from "../utils/colors";

const PriceSummary = ({ passengers, seats, seatAssignments, onContinue, darkMode,seatTotal }) => {

  const {cardClass, subPanelClass, iconBoxClass, iconColor, headingText, mutedText, dividerClass} = getThemeColors(darkMode);

  const assignedSeats = passengers?.map((passenger) => ({passenger,seat: getPassengerSeat(passenger.id, seats, seatAssignments)})).filter((item) => item.seat);
  
  return (
    <div className={`rounded-lg border p-5 shadow-sm transition-all duration-300 ${cardClass}`}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className={`text-base font-bold ${headingText}`}>Price Summary</h2>
          <p className={`mt-1 text-sm ${mutedText}`}>Seat selection details</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBoxClass}`}>
          <IndianRupee size={20} className={iconColor} />
        </div>
      </div>
      <div className={`mb-4 flex items-center justify-between rounded-lg border p-3 ${subPanelClass}`}>
        <div className={`flex items-center gap-2 text-sm font-medium ${mutedText}`}>
          <Users size={17} /> Selected Seats
        </div>
        <span className={`text-sm font-bold ${headingText}`}>
          {assignedSeats?.length}/{passengers?.length}
        </span>
      </div>
      <div className="space-y-3">
        {assignedSeats?.map(({ passenger, seat }) => (
          <div
            key={passenger.id}
            className={`flex items-center justify-between gap-3 border-b border-dashed pb-3 ${dividerClass}`}
          >
            <div className="min-w-0">
              <p className={`truncate text-sm font-semibold ${headingText}`}>{passenger.name}</p>
              <p className={`mt-1 flex items-center gap-1 text-xs ${mutedText}`}>
                <Armchair size={13} /> Seat {seat.id} · {seat.category}
              </p>
            </div>
            <span className={`shrink-0 text-sm font-semibold ${headingText}`}>
              {formatPrice(seat.price)}
            </span>
          </div>
        ))}
        {assignedSeats?.length === 0 && (
          <div className={`rounded-lg border px-3 py-6 text-center ${subPanelClass}`}>
            <Armchair size={25} className={`mx-auto mb-2 ${mutedText}`} />
            <p className={`text-sm font-medium ${headingText}`}>No seats selected</p>
            <p className={`mt-1 text-sm ${mutedText}`}>Select seats to view the total price.</p>
          </div>
        )}
      </div>
      <div className={`mt-5 border-t pt-4 ${dividerClass}`}>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-bold ${mutedText}`}>Total Seat Charges</span>
          <span className={`text-xl font-bold ${headingText}`}>{formatPrice(seatTotal)}</span>
        </div>
        <p className={`mt-1 text-sm ${mutedText}`}>Based on selected seats</p>
      </div>
      <button
        onClick={onContinue}
        disabled={assignedSeats?.length !== passengers?.length || passengers?.length === 0}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 cursor-pointer text-sm font-semibold shadow-sm transition-all duration-300 disabled:cursor-not-allowed ${darkMode? "bg-gray-100 text-gray-900 hover:bg-white disabled:bg-gray-800 disabled:text-gray-500": "bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500"}`}
      >
        Continue to Summary <ArrowRight size={17} />
      </button>
    </div>
  );
};

export default PriceSummary;
