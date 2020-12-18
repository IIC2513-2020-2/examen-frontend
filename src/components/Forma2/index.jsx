import { useEffect, useMemo, useState } from 'react';
import '../../App.css';
import Header from '../Header';
import Login from '../Login';
import DistrictsInfluxes from './DistrictInfluxes';
import DistrictForm from './DistrictForm';

const API_BASE_URL = 'http://localhost:3000';
const LOGIN_ERROR_MSG = 'Hubo un error con el inicio de sesión';
const INFLUX_ERROR_MSG = 'Hubo un error al ingresar una nueva cantidad de turistas';

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
  return fetch(`${API_BASE_URL}/api/districts/influxes`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
}

function addDistrictInflux(payload, token) {
  const { districtId, ...rest } = payload;
  return fetch(`${API_BASE_URL}/api/districts/${districtId}/influxes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(rest),
  });
}

function Forma2() {
  const [token, setToken] = useState();
  const [userName, setUserName] = useState();
  const [loginError, setLoginError] = useState();
  const [districts, setDistricts] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(true);
  const [loadingNewInflux, setLoadingNewInflux] = useState(false);
  const [newInfluxError, setNewInfluxError] = useState();

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

  const addNewInflux = async (payload) => {
    try {
      setLoadingNewInflux(true);
      const response = await addDistrictInflux(payload, token);
      let success = false;
      if (response.status === 201) {
        const body = await response.json();
        const districtIndex = districts.findIndex((district) => district.id === body.districtId);
        setDistricts((districts) => {
          const newDistricts = [...districts];
          const peopleInfluxes = newDistricts[districtIndex].PeopleInfluxes;
          newDistricts[districtIndex] = {
            ...newDistricts[districtIndex],
            PeopleInfluxes: [
              body,
              ...peopleInfluxes,
            ]
          }
          return newDistricts;
        });
        setNewInfluxError();
        success = true;
      } else {
        setNewInfluxError(INFLUX_ERROR_MSG);
      }
      setLoadingNewInflux(false);
      return success;
    } catch (e) {
      setNewInfluxError(INFLUX_ERROR_MSG);
      setLoadingNewInflux(false);
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
            <h1>Cantidad de personas</h1>
            <DistrictsInfluxes districtsByRegion={districtsByRegion} />
          </section>
          <section className="form-container">
            <h2>Ingresar cantidad</h2>
            {newInfluxError && (
              <div className="error">{newInfluxError}</div>
            )}
            <DistrictForm
              districts={districts}
              loading={loadingNewInflux}
              onSubmit={addNewInflux}
            />
          </section>
        </main>
      )}
    </div>
  );
}

export default Forma2;
