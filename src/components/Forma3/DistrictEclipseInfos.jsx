function formatDuration(duration) {
  const seconds = duration % 60;
  const minutes = Math.floor(duration / 60);
  return `${minutes > 0 ? `${minutes} minutos ` : ''}${seconds} seg`;
}

function DistrictsEclipseInfos({ districtsByRegion }) {
  return (
    Object.keys(districtsByRegion).map((regionName) => (
      <section key={regionName}>
        <h2>Región de {regionName}</h2>
        {districtsByRegion[regionName].map((district) => (
          <div key={district.id} className="district">
            <h3>{district.name}</h3>
            <ul>
              <li>Inicio eclipse: {district.EclipseInfo.startTime}</li>
              <li>Inicio totalidad: {district.EclipseInfo.totalityTime}</li>
              <li>Fin eclipse: {district.EclipseInfo.endTime}</li>
              <li>Duración: {formatDuration(district.EclipseInfo.duration)}</li>
              <li>Altura sol: {district.EclipseInfo.altitude}</li>
            </ul>
          </div>
        ))}
      </section>
    ))
  )
}

export default DistrictsEclipseInfos;
