

import './VehicleTable.css'

export const VehicleTable = ({data}) => {

    return (
        <div className="vehicle-table-container">
                    <div className="vehicle-container item-container">
                        <div className="title">Vehicle name</div>
                        <div className="vehicle">
                            <span className="icon">🚀</span>
                            <div className="vehicle-name item">{data?.vehicleName}</div>
                        </div>
                    </div>
                    <div className="home-planets-container item-container">
                        <div className="title">Home planets</div>
                        {data?.homeplanet.map((homePlanet) =>
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
                        {data?.pilots.map((pilot) =>
                        <div className="pilot">
                            <span className="icon">👨🏽‍✈️</span>
                            <div className="pilot-name item">{pilot.name}</div>
                        </div>
                        )}
                    </div>
                </div>
    )
}
