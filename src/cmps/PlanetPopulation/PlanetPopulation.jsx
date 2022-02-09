

import './PlanetPopulation.css'

export const PlanetPopulation = ({planetToShow}) => {

    return (
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
    )
}
