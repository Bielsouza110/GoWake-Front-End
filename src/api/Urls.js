const API_ROOT = 'https://gowake.daletech.pt';
export const endpoints = {
    login: `${API_ROOT}/account/login/`,
    createAccount: `${API_ROOT}/account/register/`,
    competitions: `${API_ROOT}/api/competitions/`,
    competitionCreate: `${API_ROOT}/api/competition-create/`,
    competitionsBy: `${API_ROOT}/api/competitions`,
    /* athlete: `${API_ROOT}/api/competition/`,*/
    athleteBy: `${API_ROOT}/api/competition`,
    officialBy: `${API_ROOT}/api/competition`,
    eventBy: `${API_ROOT}/api/competition`,
    submitXML:`${API_ROOT}/api/create-all/`,
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

export const getEndpointEventById = (endpoint, idCompetition, idEvent) => {
    return `${endpoints[endpoint]}/${idCompetition}/event/${idEvent}/`;
};

export const putEndpointEventById = (endpoint, idCompetition, idEvent) => {
    return `${endpoints[endpoint]}/${idCompetition}/event/${idEvent}/`;
};
export const postXML =(endpoint) =>{
    return `${endpoints[endpoint]}`
}

export const getEndpointCreateCompetition = (endpoint) => {
    return `${endpoints[endpoint]}`;
};

export const getEndpointDeleteCompetition = (endpoint, idCompetition) => {
    return `${endpoints[endpoint]}/${idCompetition}/`;
};

export const putEndpointCompetitionById = (endpoint, idCompetition) => {
    return `${endpoints[endpoint]}/${idCompetition}/`;
};