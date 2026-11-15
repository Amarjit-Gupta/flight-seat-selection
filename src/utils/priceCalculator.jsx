import meals from "../data/meals";

const getSeatPrice = (seatId, seats) => {
  const seat = seats?.find((s) => s.id === seatId);
  return seat?.price || 0;
};

export const calculateSeatTotal = (passengers, seats, seatAssignments) => {
  return passengers?.reduce(
    (total, p) => total + getSeatPrice(seatAssignments[p.id], seats),
    0
  );
};

export const calculateMealTotal = (passengers, selectedMeals) => {
  return passengers?.reduce((total, p) => {
    const mealId = selectedMeals[p.id];
    const meal = meals?.find((m) => m.id === mealId);
    return total + (meal?.price || 0);
  }, 0);
};

export const getPassengerSeat = (passengerId, seats, seatAssignments) => {
  const seatId = seatAssignments[passengerId];
  return seats?.find((s) => s.id === seatId) || null;
};

export const formatPrice = (price = 0) =>`₹${price.toLocaleString("en-IN")}`;

export const formatDate = (date) =>
  new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).toLowerCase() || date;
