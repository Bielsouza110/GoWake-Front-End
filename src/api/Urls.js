const API_ROOT = 'https://mmonteiro.pythonanywhere.com';
export const endpoints = {
    login: `${API_ROOT}/account/login/`,
    createAccount: `${API_ROOT}/account/register/`,
    competitions: `${API_ROOT}/api/competitions/`,
    competitionsBy: `${API_ROOT}/api/competitions`,
  /*  athlete: `${API_ROOT}/api/competition/`,*/
    athleteBy: `${API_ROOT}/api/competition`,
    officialBy: `${API_ROOT}/api/competition`,
    eventBy: `${API_ROOT}/api/competition`,
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

export const getEndpointDeleteOfficialById = (endpoint, idCompetition, officialId) => {
    return `${endpoints[endpoint]}/${idCompetition}/official/${officialId}/`;
};

export const getEndpointOfficialById = (endpoint, idCompetition, officialId) => {
    return `${endpoints[endpoint]}/${idCompetition}/official/${officialId}/`;
};

export const putEndpointOfficialById = (endpoint, idCompetition, officialId) => {
    return `${endpoints[endpoint]}/${idCompetition}/official/${officialId}/`;
};

export const getEndpointDeleteEventById = (endpoint, idCompetition, idEvent) => {
    return `${endpoints[endpoint]}/${idCompetition}/event/${idEvent}/`;
};

export const getEndpointCreateEvent = (endpoint, idCompetition) => {
    return `${endpoints[endpoint]}/${idCompetition}/events/`;
};
