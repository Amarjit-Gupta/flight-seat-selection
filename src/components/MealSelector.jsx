import { UtensilsCrossed, Check } from "lucide-react";
import meals from "../data/meals";
import { formatPrice } from "../utils/priceCalculator";
import { getThemeColors } from "../utils/colors";

const MealSelector = ({ passengers, selectedMeals, onMealChange, darkMode }) => {

  const { cardClass, subPanelClass, iconBoxClass, iconColor, headingText, mutedText } = getThemeColors(darkMode);

  return (
    <div className={`rounded-lg border p-5 shadow-sm transition-all duration-300 ${cardClass}`}>
      <div className="mb-5 flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBoxClass}`}>
          <UtensilsCrossed size={21} className={iconColor} />
        </div>
        <div>
          <h2 className={`text-lg font-bold ${headingText}`}>Meal Selection</h2>
          <p className={`text-sm ${mutedText}`}>Choose meals for passengers</p>
        </div>
      </div>

      <div className="space-y-6">
        {passengers?.map((passenger, index) => {

          const selectedMealId = selectedMeals[passenger.id] || "";

          return (
            <div key={passenger.id}>
              <div className="mb-3">
                <h3 className={`text-sm font-semibold ${headingText}`}>
                  {passenger.name || `Passenger ${index + 1}`}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {meals?.map((meal) => {

                  const isSelected = selectedMealId === meal.id;

                  return (
                    <button
                      key={meal.id}
                      onClick={() => onMealChange(passenger.id, meal.id)}
                      className={`relative rounded-lg border p-3 text-left transition-all duration-200 ${isSelected ? `${subPanelClass} ${darkMode ? "border-white" : "border-slate-700"}` : `${subPanelClass} hover:border-gray-700`}`}
                    >
                      {isSelected && (
                        <span className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full ${darkMode ? "bg-gray-100 text-gray-900" : "bg-slate-700 text-white"}`}>
                          <Check size={12} strokeWidth={3} />
                        </span>
                      )}
                      <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${iconBoxClass}`}>
                        <UtensilsCrossed size={18} className={iconColor} />
                      </div>
                      <p className={`pr-5 text-sm font-semibold ${headingText}`}>
                        {meal.name}
                      </p>
                      <p className={`mt-1 min-h-8 text-sm ${mutedText}`}>
                        {meal.description}
                      </p>
                      <p className={`mt-3 text-sm font-bold ${headingText}`}>
                        {formatPrice(meal.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealSelector;
