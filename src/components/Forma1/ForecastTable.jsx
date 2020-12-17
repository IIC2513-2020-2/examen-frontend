function formatDate(date) {
  const [year, month, day] = date.split('T')[0].split('-');
  return `${day}-${month}-${year}`;
}

function ForecastTable({ forecasts }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Día</th>
          <th>Pronóstico</th>
          <th>Mínima</th>
          <th>Máxima</th>
        </tr>
      </thead>
      <tbody>
        {forecasts.slice(0, 7).map((forecast) => (
          <tr key={forecast.id}>
            <td>{formatDate(forecast.date)}</td>
            <td>{forecast.forecast}</td>
            <td>{forecast.min}</td>
            <td>{forecast.max}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ForecastTable;
