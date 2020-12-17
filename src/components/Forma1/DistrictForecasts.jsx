import ForecastTable from './ForecastTable';

function DistrictsForecasts({ districtsByRegion }) {
  return (
    Object.keys(districtsByRegion).map((regionName) => (
      <section key={regionName}>
        <h2>Región de {regionName}</h2>
        {districtsByRegion[regionName].map((district) => (
          <div key={district.id} className="district">
            <h3>{district.name}</h3>
            <ForecastTable forecasts={district.WeatherForecasts} />
          </div>
        ))}
      </section>
    ))
  )
}

export default DistrictsForecasts;
