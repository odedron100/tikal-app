import React, { useState, useEffect, useCallback } from "react";
import './StarWarsTable.css'
import { getVehiclesNamesByLargestPopulations,getPlannetsToShow } from  '../../utils/starWarsApi'
import Loading from "./Loading";

export const StarWarsTable = (props) => {
    const [vehicleDataWithMaxPopulation, setVehicleDataWithMaxPopulation] = useState(null);
    const [loadingSubject, setLoadingSubject] = useState(null);
    const [planetsToShow, setPlanetsToShow] = useState(null)
    const [isError, setIsError] = useState(false)

    const updateLoading = (currentLoadingSubject) => {
        setLoadingSubject(currentLoadingSubject);
    };

    useEffect(()=> {
        const fetchData = async ()=> {
            try{
                const result = await getVehiclesNamesByLargestPopulations(updateLoading);
                setVehicleDataWithMaxPopulation(result);

            }catch{
                setIsError(true)
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async ()=> {
            try{
                const result = await getPlannetsToShow();
                setPlanetsToShow(result);

            }catch{
                setIsError(true)
            }
        }
        fetchData();
    }, []);
    return (
        <div className="star-wars-page-container">
            {!vehicleDataWithMaxPopulation ?
            <div>
                {!isError ? <Loading loadingSubject={loadingSubject} />
                :
                <div className="error-msg">{`🚫 Error to get Data from Api ${loadingSubject} 🚫`}</div>
                }
            </div>
            :
            <div className="star-wars-page">
                <div className="vehicle-table-container">
                    <div className="vehicle-container item-container">
                        <div className="title">Vehicle name</div>
                        <div className="vehicle">
                            <span className="icon">🚀</span>
                            <div className="vehicle-name item">{vehicleDataWithMaxPopulation?.vehicleName}</div>
                        </div>
                    </div>
                    <div className="home-planets-container item-container">
                        <div className="title">Home planets</div>
                        {vehicleDataWithMaxPopulation?.homeplanet.map((homePlanet) =>
                            <div className="planet">
                                <div className="home-planet-name-container">
                                    <span className="icon">🌇</span>
                                    <div className="home-planet-name item">{homePlanet.name}</div>
                                </div>
                                <div className="home-planet-population-container">
                                    <span className="icon">🌎</span>
                                    <div className="home-planet-population item">{homePlanet.population}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="pilots-container item-container">
                        <div className="title">Pilots</div>
                        {vehicleDataWithMaxPopulation?.pilots.map((pilot) =>
                        <div className="pilot">
                            <span className="icon">👨🏽‍✈️</span>
                            <div className="pilot-name item">{pilot.name}</div>
                        </div>
                        )}
                    </div>
                </div>
                {planetsToShow && <div className="planets-population-charts-container">
                {planetsToShow.map((planetToShow) =>
                    <div className="chart-container">
                        {/* There's a massive difference between each population, which makes presenting it on a graph a bit challenging to understand.
                        Therefore, I added a minimum height for the lowest populations, just to make things more clear..
                        This is completely optional and can be fixed easily. */}
                    <div className="chart" style={{"height": planetToShow.populationNumber / 50000000 > 20 ? planetToShow.populationNumber / 50000000 + '%': 20  + '%',"background":planetToShow.color}}>
                                    <div className="chart-details">
                                        <p className="population-number item"><span><i className="fas fa-user-friends"></i></span> {planetToShow.populationToShow}</p>
                                        <p className="chart-name item"><span><i className="fas fa-globe-asia"></i></span> {planetToShow.planetName}</p>
                                    </div>
                                </div>
                        </div>
                    )}
                </div>}
            </div> }
        </div>
    );
}
