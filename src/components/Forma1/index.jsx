import { useEffect, useMemo, useState } from 'react';
import '../../App.css';
import Header from '../Header';
import Login from '../Login';
import DistrictsForecasts from './DistrictForecasts';
import DistrictForm from './DistrictForm';

const API_BASE_URL = 'http://localhost:3000';
const LOGIN_ERROR_MSG = 'Hubo un error con el inicio de sesión';
const FORECAST_ERROR_MSG = 'Hubo un error al agregar un nuevo pronóstico';

function fetchLogin(payload) {
  return fetch(`${API_BASE_URL}/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

function fetchDistricts(token) {
  return fetch(`${API_BASE_URL}/api/districts/forecasts`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
}

function addDistrictForecast(payload, token) {
  const { districtId, ...rest } = payload;
  return fetch(`${API_BASE_URL}/api/districts/${districtId}/forecasts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(rest),
  });
}

function Forma1() {
  const [token, setToken] = useState();
  const [userName, setUserName] = useState();
  const [loginError, setLoginError] = useState();
  const [districts, setDistricts] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(true);
  const [loadingNewForecast, setLoadingNewForecast] = useState(false);
  const [newForecastError, setNewForecastError] = useState();

  useEffect(() => {
    if (token) {
      setLoadingDistricts(true);
      fetchDistricts(token)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          return false;
        })
        .then((body) => {
          setLoadingDistricts(false);
          if (body) setDistricts(body);
        })
    }
  }, [token]);

  const districtsByRegion = useMemo(() => {
    const data = districts.reduce((acc, district) => {
      return {
        ...acc,
        [district.region]: [...(acc[district.region] || []), district],
      }
    }, {});
    return data;
  }, [districts]);

  const login = async (payload) => {
    try {
      const response = await fetchLogin(payload);
      if (response.status === 201) {
        const { name, token } = await response.json();
        setToken(token);
        setUserName(name);
      } else {
        setLoginError(LOGIN_ERROR_MSG);
      }
    } catch (e) {
      setLoginError(LOGIN_ERROR_MSG);
    }
  };

  const logout = () => {
    setToken();
    setUserName();
    setLoginError();
  };

  const addNewForecast = async (payload) => {
    try {
      setLoadingNewForecast(true);
      const response = await addDistrictForecast(payload, token);
      let success = false;
      if (response.status === 201) {
        const body = await response.json();
        const districtIndex = districts.findIndex((district) => district.id === body.districtId);
        setDistricts((districts) => {
          const newDistricts = [...districts];
          const weatherForecasts = newDistricts[districtIndex].WeatherForecasts;
          newDistricts[districtIndex] = {
            ...newDistricts[districtIndex],
            WeatherForecasts: [
              body,
              ...weatherForecasts,
            ]
          }
          return newDistricts;
        });
        setNewForecastError();
        success = true;
      } else {
        setNewForecastError(FORECAST_ERROR_MSG);
      }
      setLoadingNewForecast(false);
      return success;
    } catch (e) {
      setNewForecastError(FORECAST_ERROR_MSG);
      setLoadingNewForecast(false);
      return false;
    }
  };

  if (!token) return (
    <Login
      onLogin={login}
      error={loginError}
    />
  );

  return (
    <div className="app">
      <Header
        onLogout={logout}
        userName={userName}
      />
      {loadingDistricts && <div className="loading">Cargando...</div>}
      {!loadingDistricts && (
        <main className="content">
          <section>
            <h1>Pronóstico tiempo</h1>
            <DistrictsForecasts districtsByRegion={districtsByRegion} />
          </section>
          <section className="form-container">
            <h2>Agregar pronóstico</h2>
            {newForecastError && (
              <div className="error">{newForecastError}</div>
            )}
            <DistrictForm
              districts={districts}
              loading={loadingNewForecast}
              onSubmit={addNewForecast}
            />
          </section>
        </main>
      )}
    </div>
  );
}

export default Forma1;
