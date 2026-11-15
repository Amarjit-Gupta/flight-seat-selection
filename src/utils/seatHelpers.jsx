export const canAssignSeat = (seatAssignments, passengerId, seat) => {
  if (!seat || seat.status === "occupied") return false;

  return !Object.entries(seatAssignments)?.some(
    ([pid, sid]) => sid === seat.id && pid !== passengerId
  );
};

export const assignSeatToPassenger = (seatAssignments, passengerId, seat, seats) => {
  if (!canAssignSeat(seatAssignments, passengerId, seat, seats)) {
    return seatAssignments;
  }
  return { ...seatAssignments, [passengerId]: seat.id };
};

export const removePassengerSeat = (seatAssignments, passengerId) => {
  const updated = { ...seatAssignments };
  delete updated[passengerId];
  return updated;
};
