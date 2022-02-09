import React, { useState, useEffect } from "react";
import './StarWarsPage.css'
import { getVehiclesNamesByLargestPopulations,getPlannetsToShow } from  '../../utils/starWarsApi'
import Loading from "../Loading/Loading";
import { VehicleTable } from "../VehicleTable/VehicleTable";
import { PlanetPopulation } from "../PlanetPopulation/PlanetPopulation";

export const StarWarsPage = (props) => {
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

            }catch(e){
                setIsError(true)
                console.log(e)
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async ()=> {
            try{
                const result = await getPlannetsToShow();
                setPlanetsToShow(result);

            }catch(e){
                setIsError(true)
                console.log(e)
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
                <VehicleTable data={vehicleDataWithMaxPopulation}/>
                {planetsToShow && <div className="planets-population-charts-container">
                    {planetsToShow.map((planetToShow) =>
                        <PlanetPopulation planetToShow={planetToShow}/>
                    )}
                </div>}
            </div> }
        </div>
    );
}
