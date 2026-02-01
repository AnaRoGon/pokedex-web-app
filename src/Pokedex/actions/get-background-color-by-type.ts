export const getBackgroundColorByType = (type: string) => {
  const typeLowCase = type.toLowerCase();
  switch (typeLowCase) {
    case "normal":
      return "bg-gray-400 rounded-full p-3 pr-4 pl-4";
    case "fighting":
      return "bg-red-600 rounded-full p-3 pr-4 pl-4";
    case "flying":
      return "bg-indigo-300 rounded-full p-3 pr-4 pl-4";
    case "poison":
      return "bg-purple-600 rounded-full p-3 pr-4 pl-4";
    case "ground":
      return "bg-yellow-700 rounded-full p-3 pr-4 pl-4";
    case "rock":
      return "bg-yellow-800 rounded-full p-3 pr-4 pl-4";
    case "bug":
      return "bg-green-600 rounded-full p-3 pr-4 pl-4";
    case "ghost":
      return "bg-indigo-700 rounded-full p-3 pr-4 pl-4";
    case "steel":
      return "bg-gray-500 rounded-full p-3 pr-4 pl-4";
    case "fire":
      return "bg-orange-600 rounded-full p-3 pr-4 pl-4";
    case "water":
      return "bg-blue-600 rounded-full p-3 pr-4 pl-4";
    case "grass":
      return "bg-green-500 rounded-full p-3 pr-4 pl-4";
    case "electric":
      return "bg-yellow-400 rounded-full p-3 pr-4 pl-4";
    case "psychic":
      return "bg-pink-500 rounded-full p-3 pr-4 pl-4";
    case "ice":
      return "bg-cyan-400 rounded-full p-3 pr-4 pl-4";
    case "dragon":
      return "bg-purple-700 rounded-full p-3 pr-4 pl-4";
    case "dark":
      return "bg-gray-800 rounded-full p-3 pr-4 pl-4";
    case "fairy":
      return "bg-pink-300 rounded-full p-3 pr-4 pl-4";
    case "stellar":
      return "bg-slate-500 rounded-full p-3 pr-4 pl-4";
    case "unknown":
      return "bg-gray-700 rounded-full p-3 pr-4 pl-4";
    default:
      return "bg-black rounded-full p-3 pr-4 pl-4";
  }
};
