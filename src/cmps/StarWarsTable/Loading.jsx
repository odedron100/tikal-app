import {
  BASIC_DATA_LOADING,
  VEHICLES_DATA_LOADING,
  PILOTS_DATA_LOADING,
  HOMEPLANET_DATA_LOADING
} from  '../../utils/starWarsApi'

const Loading = ({loadingSubject}) => {
  console.log('loadingSubject from loading', loadingSubject);
  switch(loadingSubject) {
    case BASIC_DATA_LOADING: {
      return (
          <div className="loading-container">
            <div className="text">Loading Basic Data</div>
            <div className="icon">📤</div>
            <ProgressBar key={BASIC_DATA_LOADING} />
          </div>
        );
    }
    case VEHICLES_DATA_LOADING: {
      return (
          <div className="loading-container">
            <div className="text">Loading Vehicles</div>
            <div className="icon">🚀</div>
            <ProgressBar key={VEHICLES_DATA_LOADING} />
          </div>
        );
    }
    case PILOTS_DATA_LOADING: {
      return (
          <div className="loading-container">
            <div className="text">Loading Pilots</div>
            <div className="icon">🧑🏽‍✈️</div>
            <ProgressBar key={PILOTS_DATA_LOADING} />
          </div>
        );
    }
    case HOMEPLANET_DATA_LOADING: {
      return (
          <div className="loading-container">
            <div className="text">Loading Planets</div>
            <div className="icon">🌍</div>
            <ProgressBar key={HOMEPLANET_DATA_LOADING} />
          </div>
        );
    }
    default: {
      return null;
    }
  }
}

const ProgressBar = () => {
  return (
      <div className="bar">
        <div className="progress"></div>
      </div>
    );
}

export default Loading;
