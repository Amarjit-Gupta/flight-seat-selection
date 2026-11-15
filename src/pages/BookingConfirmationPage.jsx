import { useNavigate } from "react-router-dom";
import { CheckCircle2, Plane, Armchair, UtensilsCrossed, Users, IndianRupee, ArrowLeft } from "lucide-react";
import ProgressStepper from "../components/ProgressStepper";
import BookingContext from "../context/BookingContext";
import { formatDate, formatPrice, getPassengerSeat } from "../utils/priceCalculator";
import meals from "../data/meals";
import { useContext } from "react";
import { getThemeColors } from "../utils/colors";

const BookingConfirmationPage = ({ darkMode }) => {

  const navigate = useNavigate();

  const dataContext = useContext(BookingContext);

  // console.log("all data: ",dataContext);

  const { passengers, seats, flight, layoutType, seatAssignments, seatTotal, selectedMeals, mealTotal, grandTotal } = dataContext;

  // console.log("data: ",passengers, seats, flight, layoutType, seatAssignments, seatTotal, selectedMeals, mealTotal, grandTotal);  

  const {cardClass, subPanelClass,iconBoxClass,iconColor, headingText, mutedText, dividerClass, dividerLine} = getThemeColors(darkMode);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-black" : "bg-slate-100"}`}>
      <ProgressStepper activeStep={3} completed={true} darkMode={darkMode} />
      <main className="mx-auto max-w-[1440px] space-y-6 px-4 py-8 sm:px-6">
        <div className={`rounded-lg border px-5 py-9 text-center shadow-sm transition-all duration-300 ${cardClass}`}>
          <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-xl ${iconBoxClass}`}>
            <CheckCircle2 size={38} strokeWidth={2} className={iconColor} />
          </div>
          <h1 className={`mt-5 text-2xl font-bold ${headingText}`}>
            Selection Confirmed!
          </h1>
          <p className={`mx-auto mt-2 max-w-md text-sm ${mutedText}`}>
            Seat and meal selections for all passengers are complete.
          </p>
        </div>
        <div className={`rounded-lg border p-5 shadow-sm sm:p-6 transition-all duration-300 ${cardClass}`}>
          <div className="mb-6 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBoxClass}`}>
              <Plane size={20} className={iconColor} />
            </div>
            <h2 className={`text-base font-bold ${headingText}`}>Flight Information</h2>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={`text-xl font-bold ${headingText}`}>{flight.from}</p>
              <p className={`mt-1 text-sm ${mutedText}`}>{flight.fromCity}</p>
            </div>

            <div className="flex flex-1 flex-col items-center gap-1 px-2 mt-1.5">
          <div className="flex w-full items-center gap-2">
            <div className={`h-[2px] flex-1 ${dividerLine}`} />
            <Plane className={`shrink-0 ${iconColor}`} size={22} />
            <div className={`h-[2px] flex-1 ${dividerLine}`} />
          </div>
          <span className={`text-sm font-medium ${mutedText}`}>
            {flight.duration}
          </span>
        </div>
            <div className="text-right">
              <p className={`text-xl font-bold ${headingText}`}>{flight.to}</p>
              <p className={`mt-1 text-sm ${mutedText}`}>{flight.toCity}</p>
            </div>
          </div>
          <div className={`mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t pt-4 text-sm ${dividerClass} ${mutedText}`}>
            <p>Travel Date: <b className={headingText}>{formatDate(flight.date)}</b></p>
            <p>Configuration: <b className={headingText}>{layoutType}</b></p>
            <p>Passengers: <b className={headingText}>{passengers.length}</b></p>
          </div>
        </div>
        <div className={`rounded-lg border p-5 shadow-sm sm:p-6 transition-all duration-300 ${cardClass}`}>
          <div className="mb-6 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBoxClass}`}>
              <Users size={20} className={iconColor} />
            </div>
            <div>
              <h2 className={`text-base font-bold ${headingText}`}>Passenger Selections</h2>
              <p className={`mt-0.5 text-sm ${mutedText}`}>Seat and meal details for each passenger</p>
            </div>
          </div>
          <div className="space-y-3">
            {passengers?.map((p) => {

              const seat = getPassengerSeat(p.id, seats, seatAssignments);
              const meal = meals.find((m) => m.id === selectedMeals[p.id]);

              return (
                <div key={p.id} className={`rounded-lg border p-4 transition-all duration-300 ${subPanelClass}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className={`text-sm font-bold ${headingText}`}>{p.name}</p>
                      <p className={`mt-1.5 flex items-center gap-1.5 text-sm ${mutedText}`}>
                        <Armchair size={14} /> Seat {seat?.id || "Not assigned"}
                      </p>
                    </div>
                    <span className={`inline-block rounded-lg border border-gray-600 py-1.5 px-1 text-xs font-bold ${subPanelClass} ${headingText}`}>
                      {seat?.category || "No Seat"}
                    </span>
                  </div>
                  <div className={`mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3 ${dividerClass}`}>
                    <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
                      <UtensilsCrossed size={14} />
                      {meal?.name || "No meal selected"}
                    </div>
                    <span className={`text-xs font-semibold ${headingText}`}>
                      Seat: {formatPrice(seat?.price)}
                    </span>
                  </div>
                  {meal && (
                    <p className={`mt-2 text-right text-sm ${mutedText}`}>
                      Meal: {formatPrice(meal.price)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className={`rounded-lg border p-5 shadow-sm sm:p-6 transition-all duration-300 ${cardClass}`}>
          <div className="mb-6 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBoxClass}`}>
              <IndianRupee size={20} className={iconColor} />
            </div>
            <h2 className={`text-base font-bold ${headingText}`}>Final Price Summary</h2>
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
                <p className={`text-sm font-bold ${headingText}`}>Total Amount</p>
                <p className={`mt-1 text-sm ${mutedText}`}>Including all selected services</p>
              </div>
              <span className={`text-2xl font-bold ${headingText}`}>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-5 py-3.5 text-sm font-semibold transition-all duration-300 ${cardClass} ${headingText} ${darkMode ? "hover:bg-[#22272f]" : "hover:bg-slate-50"}`}
        >
          <ArrowLeft size={17} /> Back to Seat Selection
        </button>
      </main>
    </div>
  );
};

export default BookingConfirmationPage;
