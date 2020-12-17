import { useEffect, useState } from 'react';

const FORECASTS_OPTIONS = [
  'Despejado',
  'Parcial',
  'Nublado',
  'Lluvia',
];

function DistrictForm({ districts, loading, onSubmit }) {
  const [payload, setPayload] = useState({
    forecast: '',
    date: '',
    min: '',
    max: '',
    districtId: '',
  });

  useEffect(() => {
    setPayload((payload) => ({
      ...payload,
      forecast: FORECASTS_OPTIONS[0],
      districtId: districts.length && districts[0].id,
    }));
  }, [districts, setPayload]);

  const clearForm = () => {
    setPayload((payload) => ({
      ...payload,
      date: '',
      min: '',
      max: '',
    }));
  };

  const handleChange = (event) => {
    setPayload((payload) => ({
      ...payload,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(payload)
      .then((success) => {
        if (success) clearForm();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="district">Comuna</label>
        <select id="districtId" name="districtId" onChange={handleChange} value={payload.districtId}>
          {districts.map((district) => (
            <option
              key={district.id}
              value={district.id}
            >
              {district.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="date">Fecha (día)</label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={handleChange}
          value={payload.date}
        />
      </div>
      <div className="field">
        <label htmlFor="forecast">Pronóstico</label>
        <select id="forecast" name="forecast" onChange={handleChange} value={payload.forecast}>
          {FORECASTS_OPTIONS.map((forecast) => (
            <option
              key={forecast}
              value={forecast}
            >
              {forecast}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="min">Mínima (ºC)</label>
        <input
          type="number"
          id="min"
          name="min"
          min="0"
          max="100"
          onChange={handleChange}
          value={payload.min}
        />
      </div>
      <div className="field">
        <label htmlFor="max">Máxima (ºC)</label>
        <input
          type="number"
          id="max"
          name="max"
          min="0"
          max="100"
          onChange={handleChange}
          value={payload.max}
        />
      </div>
      <div className="actions">
        <button disabled={loading}>Agregar</button>
      </div>
    </form>
  );
}

export default DistrictForm;
