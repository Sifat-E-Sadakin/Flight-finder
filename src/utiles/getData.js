import data from "../../public/data/data.json";

const segments = data.flightOffer.map(item =>
  item.itineraries[0].segments.map(segment => segment)
);
const cities = segments.map(item => item.map(city => city.departure.iataCode));
export const uniqueCities = cities
  .flat()
  .filter((item, index, array) => array.indexOf(item) === index);
