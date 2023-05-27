const API_ROOT = 'https://gowake.daletech.pt';
export const endpoints = {
    login: `${API_ROOT}/account/login/`,
    createAccount: `${API_ROOT}/account/register/`,
    competitions: `${API_ROOT}/api/competitions/`,
    competitionsBy: `${API_ROOT}/api/competitions`,
  /*  athlete: `${API_ROOT}/api/competition/`,*/
    athleteBy: `${API_ROOT}/api/competition`,
    officialBy: `${API_ROOT}/api/competition`,
};

export const getEndpointCompetitionById = (endpoint, id) => {
    return `${endpoints[endpoint]}/${id}/`;
};

export const getEndpointAthleteById = (endpoint, idCompetition, idAthlete) => {
    return `${endpoints[endpoint]}/${idCompetition}/athlete/${idAthlete}/`;
};

export const putEndpointAthleteById = (endpoint, idCompetition, idAthlete) => {
    return `${endpoints[endpoint]}/${idCompetition}/athlete/${idAthlete}/`;
};

export const getEndpointDeleteAthleteById = (endpoint, idCompetition, idAthlete) => {
    return `${endpoints[endpoint]}/${idCompetition}/athlete/${idAthlete}/`;
};

export const getEndpointCreateAthlete = (endpoint, idCompetition) => {
    return `${endpoints[endpoint]}/${idCompetition}/athletes/`;
};

export const getEndpointCreateOfficial = (endpoint, idCompetition) => {
    return `${endpoints[endpoint]}/${idCompetition}/officials/`;
};

export const getEndpointDeleteOfficialById = (endpoint, idCompetition, idAthlete) => {
    //rever este endpoint officer!!!
    return `${endpoints[endpoint]}/${idCompetition}/official/${idAthlete}/`;
};