const API_ROOT = 'https://mmonteiro.pythonanywhere.com';

/*const LOGIN_URL = `${API_ROOT}/account/login/`;
const CREATEACCOUNT_URL = `${API_ROOT}/account/register/`;
const COMPETITIONS_URL = `${API_ROOT}/api/competitions/`;
const COMPETITIONSBYID_URL = `${API_ROOT}api/competitions/${id}/`;*/

export const endpoints = {
    login: `${API_ROOT}/account/login/`,
    createAccount: `${API_ROOT}/account/register/`,
    competitions: `${API_ROOT}/api/competitions/`,
};

export const getEndpointById = (endpoint, id) => {
    return `${endpoints[endpoint]}/${id}/`;
};
