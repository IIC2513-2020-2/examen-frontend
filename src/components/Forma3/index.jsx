import { useEffect, useMemo, useState } from 'react';
import '../../App.css';
import Header from '../Header';
import Login from '../Login';
import DistrictEclipseInfos from './DistrictEclipseInfos';
import DistrictForm from './DistrictForm';

const API_BASE_URL = 'http://localhost:3000';
const LOGIN_ERROR_MSG = 'Hubo un error con el inicio de sesión';
const INFO_ERROR_MSG = 'Hubo un error al actualizar la información del eclipse';

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
  return fetch(`${API_BASE_URL}/api/districts/eclipse-info`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
}

function updateDistrictEclipseInfo(payload, token) {
  const { districtId, ...rest } = payload;
  return fetch(`${API_BASE_URL}/api/districts/${districtId}/eclipse-info`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(rest),
  });
}

function Forma3() {
  const [token, setToken] = useState();
  const [userName, setUserName] = useState();
  const [loginError, setLoginError] = useState();
  const [districts, setDistricts] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(true);
  const [loadingInfoUpdate, setLoadingInfoUpdate] = useState(false);
  const [eclipseInfoError, setEclipseInfoError] = useState();

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

  const updateEclipseInfo = async (payload) => {
    try {
      setLoadingInfoUpdate(true);
      const cleanPayload = Object.keys(payload).reduce((acc, key) => {
        if (!payload[key]) return acc;
        return {
          ...acc,
          [key]: payload[key],
        }
      }, {});
      const response = await updateDistrictEclipseInfo(cleanPayload, token);
      let success = false;
      if (response.status === 200) {
        const body = await response.json();
        const districtIndex = districts.findIndex((district) => district.id === body.districtId);
        setDistricts((districts) => {
          const newDistricts = [...districts];
          newDistricts[districtIndex] = {
            ...newDistricts[districtIndex],
            EclipseInfo: body,
          }
          return newDistricts;
        });
        setEclipseInfoError();
        success = true;
      } else {
        setEclipseInfoError(INFO_ERROR_MSG);
      }
      setLoadingInfoUpdate(false);
      return success;
    } catch (e) {
      setEclipseInfoError(INFO_ERROR_MSG);
      setLoadingInfoUpdate(false);
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
            <h1>Información eclipse</h1>
            <DistrictEclipseInfos districtsByRegion={districtsByRegion} />
          </section>
          <section className="form-container">
            <h2>Actualizar información</h2>
            {eclipseInfoError && (
              <div className="error">{eclipseInfoError}</div>
            )}
            <DistrictForm
              districts={districts}
              loading={loadingInfoUpdate}
              onSubmit={updateEclipseInfo}
            />
          </section>
        </main>
      )}
    </div>
  );
}

export default Forma3;
