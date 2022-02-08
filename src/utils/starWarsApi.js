
export const BASIC_DATA_LOADING = 'basic';
export const VEHICLES_DATA_LOADING = 'vehicles';
export const PILOTS_DATA_LOADING = 'pilots';
export const HOMEPLANET_DATA_LOADING = 'homeplanet';

let apiCollectionData = null;

export const getVehiclesNamesByLargestPopulations = async (setCurrentLoadingSubject) => {
  setCurrentLoadingSubject(BASIC_DATA_LOADING);
  const apiCollection = await getApiCollection()
  setCurrentLoadingSubject(VEHICLES_DATA_LOADING);
  const collectionResponse = await fetch(apiCollection.vehicles);
  const { results } = await collectionResponse.json();
  const vehiclesWithPilotsPromises = results.map(async (vehicle) => {
    const pilotPromises = vehicle.pilots.map(pilotUrl => fetch(pilotUrl));
    const pilotResponses = await Promise.all(pilotPromises);
    const pilotsCollectionforVehicle = await Promise.all(pilotResponses.map(currentRes => currentRes.json()));

    return { ...vehicle, pilots: pilotsCollectionforVehicle };
  });

  setCurrentLoadingSubject(PILOTS_DATA_LOADING);
  const vehiclesWithPilots = await Promise.all(vehiclesWithPilotsPromises);
  const vehiclesWithFullDataArray = [];
  for (const vehicle of vehiclesWithPilots) {
    const pilotsWithHomeplanetPromises = vehicle.pilots.map(async (pilot) => {

      const homeplanetResponse = await fetch(pilot.homeworld);
      const homeplanet = await homeplanetResponse.json();

      return { ...pilot, homeworld: homeplanet }
    });
    setCurrentLoadingSubject(HOMEPLANET_DATA_LOADING);
    const pilotsWithHomeplanet = await Promise.all(pilotsWithHomeplanetPromises);

    vehiclesWithFullDataArray.push({ ...vehicle, pilots: pilotsWithHomeplanet });
  }

  let maxPopulation = 0;
  const vehicleDataWithMaxPopulation = vehiclesWithFullDataArray.reduce((vehicleDataWithMaxPopulation, vehicle) => {
    const totalPopulation = vehicle.pilots.reduce((sum, currentItem) => sum + parseInt(currentItem.homeworld.population), 0);
    maxPopulation = maxPopulation < totalPopulation ? totalPopulation : maxPopulation;
    vehicleDataWithMaxPopulation[totalPopulation] = { vehicleName: vehicle.name, totalPopulation, pilots: vehicle.pilots, homeplanet: vehicle.pilots.map(pilot => pilot.homeworld) };

    return vehicleDataWithMaxPopulation;
  });

  return vehicleDataWithMaxPopulation[maxPopulation];
}

export const getPlannetsToShow = async () => {
  const apiCollection = await getApiCollection()
  const collectionResponse = await fetch(apiCollection.planets);
  const { results } = await collectionResponse.json();

  const planetsToShow = ['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor'].map(planetName => {
    const planet = results.find(planet => planet.name === planetName)
    return { 'populationToShow': intToString(planet.population), 'populationNumber': planet.population, 'color': getRandomColor(), 'planetName': planet.name }
  });
  return planetsToShow;
}

const getApiCollection = async () => {
  if (!apiCollectionData) {
    const response = await fetch('https://swapi.dev/api/');
    apiCollectionData = await response.json();
  }
  return apiCollectionData;
}

function intToString(value) {
  var suffixes = ["", "k", "m", "b", "t"];
  var suffixNum = Math.floor(("" + value).length / 3);
  var shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
