import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Armchair, ArrowLeft, ArrowRight, IndianRupee, Users, Plane } from "lucide-react";
import ProgressStepper from "../components/ProgressStepper";
import MealSelector from "../components/MealSelector";
import { formatDate, formatPrice, getPassengerSeat } from "../utils/priceCalculator";
import BookingContext from "../context/BookingContext";
import { getThemeColors } from "../utils/colors";

const BookingSummaryPage = ({ darkMode }) => {

  const navigate = useNavigate();

  const dataContext = useContext(BookingContext);
  
  // console.log("data: ",dataContext);

  const {passengers, seats, flight, layoutType,seatAssignments, seatTotal,selectedMeals, mealTotal, grandTotal,updateMeal} = dataContext;
  
  const {cardClass, subPanelClass,iconBoxClass,iconColor, headingText, mutedText, dividerClass} = getThemeColors(darkMode);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-black" : "bg-slate-100"}`}>
      <ProgressStepper activeStep={3} darkMode={darkMode} />

      <main className="mx-auto max-w-[1440px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <h1 className={`text-2xl font-bold ${headingText}`}>
            Booking Summary
          </h1>
          <p className={`mt-1 text-sm ${mutedText}`}>
            Review passenger and seat details.
          </p>
        </div>
        <div className={`rounded-lg border p-5 shadow-sm sm:p-6 transition-all duration-300 ${cardClass}`}>
          <div className="mb-5 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBoxClass}`}>
              <Plane size={20} className={iconColor} />
            </div>
            <h2 className={`text-base font-bold ${headingText}`}>
              Flight Information
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className={`text-xs font-medium ${mutedText}`}>Flight Route</p>
              <h2 className={`mt-1 text-lg font-bold flex items-center gap-3 ${headingText}`}>
                {flight.from} ({flight.fromCity})<ArrowRight size={18} />{flight.to} ({flight.toCity})
              </h2>
            </div>
            <div className="sm:text-right">
              <p className={`text-sm ${mutedText}`}>Travel Date</p>
              <p className={`mt-1 text-sm font-semibold ${headingText}`}>{formatDate(flight.date)}</p>
            </div>
          </div>
          <div className={`mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t pt-4 text-sm ${dividerClass} ${mutedText}`}>
            <span>Configuration: <b className={headingText}>{layoutType}</b></span>
            <span>Passengers: <b className={headingText}>{passengers.length}</b></span>
            <span>Duration: <b className={headingText}>{flight.duration}</b></span>
          </div>
        </div>

        <div className={`rounded-lg border p-5 shadow-sm sm:p-6 transition-all duration-300 ${cardClass}`}>
          <div className="mb-6 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBoxClass}`}>
              <Users size={20} className={iconColor} />
            </div>
            <div>
              <h2 className={`text-base font-bold ${headingText}`}>Passenger Details</h2>
              <p className={`mt-0.5 text-sm ${mutedText}`}>Assigned seats and individual charges</p>
            </div>
          </div>

          <div className="space-y-3">
            {passengers?.map((p) => {
              const seat = getPassengerSeat(p.id, seats, seatAssignments);
              return (
                <div key={p.id} className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 transition-all duration-300 ${subPanelClass}`}>
                  <div>
                    <p className={`text-sm font-bold ${headingText}`}>{p.name}</p>
                    <p className={`mt-1.5 flex items-center gap-1.5 text-sm ${mutedText}`}>
                      <Armchair size={14} /> Seat {seat?.id || "Not assigned"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block rounded-lg border py-1.5 px-1 text-xs font-semibold ${subPanelClass} ${headingText}`}>
                      {seat?.category || "No seat"}
                    </span>
                    <p className={`mt-2 text-sm font-bold ${headingText}`}>{formatPrice(seat?.price || 0)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <MealSelector
          passengers={passengers}
          selectedMeals={selectedMeals}
          onMealChange={updateMeal}
          darkMode={darkMode}
        />

        <div className={`rounded-lg border p-5 shadow-sm sm:p-6 transition-all duration-300 ${cardClass}`}>
          <div className="mb-6 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBoxClass}`}>
              <IndianRupee size={20} className={iconColor} />
            </div>
            <h2 className={`text-base font-bold ${headingText}`}>Price Breakdown</h2>
          </div>
          <div className="space-y-4">
            <div className={`flex justify-between text-sm ${mutedText}`}>
              <span>Seat Charges</span>
              <span className={`font-medium ${headingText}`}>{formatPrice(seatTotal)}</span>
            </div>
            <div className={`flex justify-between text-sm ${mutedText}`}>
              <span>Meal Charges</span>
              <span className={`font-medium ${headingText}`}>{formatPrice(mealTotal)}</span>
            </div>
            <div className={`flex items-center justify-between gap-3 border-t pt-5 ${dividerClass}`}>
              <div>
                <p className={`text-sm font-bold ${headingText}`}>Grand Total</p>
                <p className={`mt-1 text-sm ${mutedText}`}>Including all selected services</p>
              </div>
              <span className={`text-2xl font-bold ${headingText}`}>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/")}
            className={`flex items-center justify-center gap-2 rounded-lg border px-5 py-3.5 text-sm font-semibold cursor-pointer transition-all duration-300 ${cardClass} ${headingText} ${darkMode ? "hover:bg-gray-800" : "hover:bg-slate-50"}`}
          >
            <ArrowLeft size={17} /> Back to Seats
          </button>
          <button
            disabled={passengers.some((p) => !seatAssignments[p.id])}
            onClick={()=>navigate("/confirmation")}
            className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold cursor-pointer transition-all duration-300 disabled:cursor-not-allowed ${darkMode? "bg-gray-100 text-gray-900 hover:bg-white disabled:bg-gray-800 disabled:text-gray-500": "bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500"}`}
          >
            Confirm Selection <ArrowRight size={17} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default BookingSummaryPage;
