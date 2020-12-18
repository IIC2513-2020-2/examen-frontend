import { useEffect, useState } from 'react';

function DistrictForm({ districts, loading, onSubmit }) {
  const [payload, setPayload] = useState({
    startTime: '',
    totalityTime: '',
    endTime: '',
    duration: '',
    altitude: '',
    districtId: '',
  });

  useEffect(() => {
    if (districts.length) {
      const districtId = payload.districtId || districts[0].id;
      setPayload((payload) => ({
        ...payload,
        districtId,
      }));
    }
  }, [districts, payload.districtId, setPayload]);

  useEffect(() => {
    if (districts.length && payload.districtId) {
      const {
        EclipseInfo: { startTime, totalityTime, endTime, duration, altitude },
      } = districts.find((district) => district.id === Number(payload.districtId));
      setPayload((payload) => ({
        ...payload,
        startTime,
        totalityTime,
        endTime,
        duration,
        altitude,
      }));
    }
  }, [districts, payload.districtId, setPayload]);

  const handleChange = (event) => {
    setPayload((payload) => ({
      ...payload,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(payload);
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
        <label htmlFor="startTime">Hora inicio eclipse</label>
        <input
          type="text"
          id="startTime"
          name="startTime"
          onChange={handleChange}
          value={payload.startTime}
        />
      </div>
      <div className="field">
        <label htmlFor="totalityTime">Hora totalidad eclipse</label>
        <input
          type="text"
          id="totalityTime"
          name="totalityTime"
          onChange={handleChange}
          value={payload.totalityTime}
        />
      </div>
      <div className="field">
        <label htmlFor="endTime">Hora fin eclipse</label>
        <input
          type="text"
          id="endTime"
          name="endTime"
          onChange={handleChange}
          value={payload.endTime}
        />
      </div>
      <div className="field">
        <label htmlFor="duration">Duración totalidad (segundos)</label>
        <input
          type="number"
          id="duration"
          name="duration"
          min="1"
          max="130"
          onChange={handleChange}
          value={payload.duration}
        />
      </div>
      <div className="field">
        <label htmlFor="altitude">Altura del sol en totalidad (grados)</label>
        <input
          type="text"
          id="altitude"
          name="altitude"
          onChange={handleChange}
          value={payload.altitude}
        />
      </div>
      <div className="actions">
        <button disabled={loading}>Actualizar</button>
      </div>
    </form>
  );
}

export default DistrictForm;
