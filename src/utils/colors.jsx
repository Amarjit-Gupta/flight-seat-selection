export const getThemeColors = (darkMode) => ({
cardClass: darkMode? "border-gray-800 bg-gray-900 hover:border-gray-700": "border-slate-200 bg-white hover:border-slate-300",

subPanelClass: darkMode? "border-gray-800 bg-gray-800": "border-slate-200 bg-slate-50",

headerClass: darkMode? "border-gray-800 bg-gray-900": "border-slate-200 bg-white",

iconBoxClass: darkMode? "bg-gray-800": "bg-slate-100",

iconColor: darkMode? "text-gray-100": "text-slate-900",

logoBoxClass: darkMode? "bg-gray-100 text-gray-900": "bg-slate-900 text-white",

headingText: darkMode? "text-gray-100": "text-slate-700",

mutedText: darkMode? "text-gray-400": "text-slate-500",

dividerClass: darkMode? "border-gray-700": "border-slate-200",

dividerLine: darkMode? "bg-gray-600": "bg-slate-300",

connectorBg: darkMode? "bg-gray-800": "bg-slate-200",

completedConnector: darkMode? "bg-gray-700": "bg-slate-900",

completedCircle: darkMode? "border-gray-700 bg-gray-800 text-gray-100": "border-slate-900 bg-slate-900 text-white",

activeCircle: darkMode? "border-2 border-gray-700 bg-gray-800 text-gray-100": "border-2 border-slate-900 bg-slate-900 text-white",

inactiveCircle: darkMode? "border-gray-800 bg-gray-900 text-gray-500": "border-slate-200 bg-white text-slate-400",

});

export const getSeatClass = (seat, isSelected, isOccupied, darkMode) => {

  if (isSelected) {
    return darkMode? "border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-950/40": "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200";
  }

  if (isOccupied) {
    return "cursor-not-allowed border-slate-400 bg-slate-500 text-white opacity-80";
  }

  if (seat.price === 0) {
    return darkMode? "border-green-500 bg-green-950/50 text-green-400 hover:bg-green-900/70": "border-green-500 bg-green-50 text-green-700 hover:bg-green-100";
  }

  if (seat.category === "Premium") {
    return darkMode? "border-purple-500 bg-purple-950/50 text-purple-400 hover:bg-purple-900/70": "border-purple-500 bg-purple-50 text-purple-700 hover:bg-purple-100";
  }

  if (seat.category === "Extra Legroom") {
    return darkMode? "border-orange-500 bg-orange-950/50 text-orange-400 hover:bg-orange-900/70": "border-orange-500 bg-orange-50 text-orange-700 hover:bg-orange-100";
  }

  return darkMode? "border-blue-500 bg-blue-950/50 text-blue-400 hover:bg-blue-900/70": "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100";
  
};
