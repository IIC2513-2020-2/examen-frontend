function formatDate(date) {
  const [, month, day] = date.split('T')[0].split('-');
  return `${day}/${month}`;
}

function DistrictsInfluxes({ districtsByRegion }) {
  return (
    Object.keys(districtsByRegion).map((regionName) => (
      <section key={regionName}>
        <h2>Región de {regionName}</h2>
        {districtsByRegion[regionName].map((district) => (
          <div key={district.id} className="district">
            <h3>{district.name}</h3>
            <ul>
            {district.PeopleInfluxes.slice(0, 7).map((influx) => (
              <li key={influx.id}>{formatDate(influx.date)}: {influx.quantity}</li>
            ))}
            </ul>
          </div>
        ))}
      </section>
    ))
  )
}

export default DistrictsInfluxes;
