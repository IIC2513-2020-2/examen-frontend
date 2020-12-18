import { useEffect, useState } from 'react';

function DistrictForm({ districts, loading, onSubmit }) {
  const [payload, setPayload] = useState({
    quantity: '',
    date: '',
    districtId: '',
  });

  useEffect(() => {
    setPayload((payload) => ({
      ...payload,
      districtId: districts.length && districts[0].id,
    }));
  }, [districts, setPayload]);

  const clearForm = () => {
    setPayload((payload) => ({
      ...payload,
      date: '',
      quantity: '',
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
        <label htmlFor="quantity">Cantidad de personas</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          onChange={handleChange}
          value={payload.quantity}
        />
      </div>
      <div className="actions">
        <button disabled={loading}>Ingresar</button>
      </div>
    </form>
  );
}

export default DistrictForm;
