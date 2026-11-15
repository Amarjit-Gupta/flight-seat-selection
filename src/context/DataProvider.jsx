import { useMemo, useState } from "react";
import getSeats from "../data/seats";
import getPassengers from "../data/passengers";
import flight from "../data/flight";
import {assignSeatToPassenger,removePassengerSeat} from "../utils/seatHelpers";
import {calculateSeatTotal,calculateMealTotal} from "../utils/priceCalculator";
import BookingContext from "./BookingContext";

const DataProvider = ({ children }) => {

  const [passengerCount, setPassengerCount] = useState(2);
  const [selectedPassengerId, setSelectedPassengerId] = useState("p1");
  const [layoutType, setLayoutType] = useState("3-2");
  const [seatAssignments, setSeatAssignments] = useState({});
  const [selectedMeals, setSelectedMeals] = useState({});

  const passengers = useMemo(() => getPassengers(passengerCount), [passengerCount]);
  const seats = useMemo(() => getSeats(layoutType), [layoutType]);

  const seatTotal = useMemo(() => calculateSeatTotal(passengers, seats, seatAssignments),[passengers, seats, seatAssignments]);

  const mealTotal = useMemo(() => calculateMealTotal(passengers, selectedMeals),[passengers, selectedMeals]);

  const grandTotal = seatTotal + mealTotal;

  const updatePassengerCount = (count) => {
    const newCount = Math.max(1, Math.min(9, count));
    setPassengerCount(newCount);

    const isPassengerValid = (id) => Number(id.replace("p", "")) <= newCount;
    setSeatAssignments((prev) => Object.fromEntries(Object.entries(prev)?.filter(([id]) => isPassengerValid(id))));
    setSelectedMeals((prev) => Object.fromEntries(Object.entries(prev)?.filter(([id]) => isPassengerValid(id))));

    if (!isPassengerValid(selectedPassengerId)) {
      setSelectedPassengerId(`p${newCount}`);
    }
  };

  const updateLayout = (newLayout) => {
    if (newLayout === layoutType) return;
    setLayoutType(newLayout);
    setSeatAssignments({});
  };

  const selectSeat = (seatId) => {
    const seat = seats?.find((s) => s.id === seatId);
    const updated = assignSeatToPassenger(seatAssignments,selectedPassengerId,seat,seats);
    if (updated === seatAssignments) return false;
    setSeatAssignments(updated);
    return true;
  };

  const removeSeat = () => {
    setSeatAssignments((prev) => removePassengerSeat(prev, selectedPassengerId));
  };

  const updateMeal = (passengerId, mealId) => {
    setSelectedMeals((prev) => ({ ...prev, [passengerId]: mealId }));
  };

  const value = {
    // state
    passengerCount,
    passengers,
    seats,
    flight,
    layoutType,
    seatAssignments,
    selectedMeals,
    selectedPassengerId,

    // total
    seatTotal,
    mealTotal,
    grandTotal,

    // action
    updatePassengerCount,
    setSelectedPassengerId,
    updateLayout,
    selectSeat,
    removeSeat,
    updateMeal,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default DataProvider;
