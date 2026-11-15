import { useNavigate } from "react-router-dom";
import ProgressStepper from "../components/ProgressStepper";
import FlightInfo from "../components/FlightInfo";
import PassengerSelector from "../components/PassengerSelector";
import PassengerList from "../components/PassengerList";
import SeatMap from "../components/SeatMap";
import SeatLegend from "../components/SeatLegend";
import PriceSummary from "../components/PriceSummary";
import BookingContext from "../context/BookingContext";
import { useContext } from "react";
import { getThemeColors } from "../utils/colors";

const SeatSelectionPage = ({ darkMode }) => {

  const navigate = useNavigate();

  const dataContext = useContext(BookingContext);

  // console.log("data2: ", dataContext);

  const {passengerCount,updatePassengerCount,passengers,seats,flight,selectedPassengerId,setSelectedPassengerId,layoutType,updateLayout,seatAssignments,selectSeat,removeSeat,seatTotal} = dataContext;

  const {headingText, mutedText} = getThemeColors(darkMode);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-black" : "bg-slate-100"}`}>
      <ProgressStepper activeStep={2} darkMode={darkMode} />

      <main className="mx-auto max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div>
          <h1 className={`text-2xl font-bold ${headingText}`}>
            Select Seats
          </h1>
          <p className={`mt-1 text-sm ${mutedText}`}>
            Choose comfortable seats for all passengers.
          </p>
        </div>

        <FlightInfo flight={flight} darkMode={darkMode} />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[260px_1fr]">
              <PassengerSelector
                passengerCount={passengerCount}
                onPassengerCountChange={updatePassengerCount}
                darkMode={darkMode}
              />
              <PassengerList
                passengers={passengers}
                selectedPassengerId={selectedPassengerId}
                seatAssignments={seatAssignments}
                onSelectPassenger={setSelectedPassengerId}
                darkMode={darkMode}
              />
            </div>
            <SeatMap
              layoutType={layoutType}
              onLayoutChange={updateLayout}
              seats={seats}
              seatAssignments={seatAssignments}
              selectedPassengerId={selectedPassengerId}
              onSeatSelect={(seat) => selectSeat(seat.id)}
              darkMode={darkMode}
            />
            <SeatLegend darkMode={darkMode} />
            {seatAssignments[selectedPassengerId] && (
              <button
                onClick={removeSeat}
                className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer"
              >
                Remove Selected Passenger Seat
              </button>
            )}
          </div>
          <div className="lg:sticky lg:top-24">
            <PriceSummary
              passengers={passengers}
              seats={seats}
              seatTotal={seatTotal}
              seatAssignments={seatAssignments}
              onContinue={()=>navigate("/summary")}
              darkMode={darkMode}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeatSelectionPage;
