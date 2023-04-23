const API_ROOT = 'https://mmonteiro.pythonanywhere.com';
export const endpoints = {
    login: `${API_ROOT}/account/login/`,
    createAccount: `${API_ROOT}/account/register/`,
    competitions: `${API_ROOT}/api/competitions/`,
};

export const getEndpointById = (endpoint, id) => {
    return `${endpoints[endpoint]}/${id}/`;
};



