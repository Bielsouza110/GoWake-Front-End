const API_ROOT = 'https://mmonteiro.pythonanywhere.com';
export const endpoints = {
    login: `${API_ROOT}/account/login/`,
    createAccount: `${API_ROOT}/account/register/`,
    competitions: `${API_ROOT}/api/competitions/`,
    deleteAthlete: `${API_ROOT}/api/competition/`,
};

export const getEndpointCompetitionById = (endpoint, id) => {
    return `${endpoints[endpoint]}/${id}/`;
};

export const getEndpointDeleteAthleteById = (endpoint, idCompetition, idAthlete) => {
    return `${endpoints[endpoint]}/${idCompetition}/athlete/${idAthlete}/`;
};
