// price
const seatPrices = {
  standard: 0,
  premium: 250,
  extraLegroom: 350,
};

export const seatLayouts = {
  "3-2": [
    ["A", "B", "C"],
    ["D", "E"],
  ],
  "2-3-2": [
    ["A", "B"],
    ["C", "D", "E"],
    ["F", "G"],
  ],
};

const occupiedSeats = ["2C", "3D"];

const getSeats = (layoutType = "3-2") => {
  const letters = seatLayouts[layoutType].flat();
  const rows = 6;

  return Array.from({ length: rows }, (_, rowIndex) => {
    const row = rowIndex + 1;

    return letters?.map((letter, index) => {
      const id = `${row}${letter}`;

      let category = "Standard";
      let price = seatPrices.standard;

      const premiumSeats = ["1A", "2A", "3B", "5C", "5E", "2F", "4G", "6F"];

      const extraLegroomSeats = ["1B","1C","1G","4A","5B","4D","6D","2E","4F","6A","6G"];

      if (premiumSeats.includes(id)) {
        category = "Premium";
        price = seatPrices.premium;
      }

      if (extraLegroomSeats.includes(id)) {
        category = "Extra Legroom";
        price = seatPrices.extraLegroom;
      }

      return {id,row,label: letter,category,price,status: occupiedSeats.includes(id) ? "occupied" : "available",};
    });
  }).flat();
};

export default getSeats;
