import { UserRound, Armchair, CheckCircle2, Users } from "lucide-react";
import { getThemeColors } from "../utils/colors";

const PassengerList = ({ passengers, selectedPassengerId, seatAssignments, onSelectPassenger, darkMode }) => {

  const { cardClass, subPanelClass, iconBoxClass, headingText, mutedText } = getThemeColors(darkMode);

  return (
    <div className={`rounded-lg border p-5 shadow-sm transition-all duration-300 ${cardClass}`}>
      <div className="mb-4">
        <h3 className={`text-sm font-bold ${headingText}`}>Passenger List</h3>
        <p className={`mt-1 text-sm ${mutedText}`}>Select a passenger to assign a seat</p>
      </div>

      <div className="space-y-3">
        {passengers?.map((passenger, index) => {

          const isActive = selectedPassengerId === passenger.id;
          const assignedSeat = seatAssignments[passenger.id];

          return (
            <button
              key={passenger.id}
              onClick={() => onSelectPassenger(passenger.id)}
              className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-all duration-200 ${subPanelClass} ${isActive ? darkMode ? "border border-white" : "border border-slate-900" : darkMode ? "hover:border-gray-700" : "hover:border-slate-300"}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isActive ? darkMode ? "bg-gray-100 text-gray-900" : "bg-slate-900 text-white" : `${iconBoxClass} ${mutedText}`}`}>
                  <UserRound size={17} />
                </div>
                <div className="min-w-0">
                  <p className={`truncate text-sm font-semibold ${headingText}`}>
                    {passenger.name || `Passenger ${index + 1}`}
                  </p>
                  <div className={`mt-1 flex items-center gap-1.5 text-sm ${mutedText}`}>
                    <Armchair size={13} />
                    {assignedSeat ? `Seat: ${assignedSeat}` : "Seat: Not Selected"}
                  </div>
                </div>
              </div>

              {assignedSeat ? (
                <CheckCircle2 size={19} className={`shrink-0 ${headingText}`} />
              ) : (
                <span className={`h-4 w-4 shrink-0 rounded-full border-2 ${isActive ? darkMode ? "border-gray-100 " : "border-slate-900" : darkMode ? "border-gray-700" : "border-slate-300"}`} />
              )}
            </button>
          );
        })}

        {passengers?.length === 0 && (
          <div className={`rounded-lg border py-8 text-center ${subPanelClass}`}>
            <Users className={`mx-auto mb-2 ${mutedText}`} size={24} />
            <p className={`text-sm font-medium ${headingText}`}>No passengers found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerList;
