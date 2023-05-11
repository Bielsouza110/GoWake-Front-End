/*const ageFlags = {
    0: '👶', 1: '👦', 2: '👧', 3: '👨', 4: '👩',
};*/

export const getCountryFlag = (countryCode) => {
    return <img className="p-1 my-1" src = {`https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`}  alt = {countryCode.toLowerCase()} /> ;
}

const genderFlags = {
    M: '👨', F: '👩',
};

export const GetGenderFlags = (genderCode) => {
    const flag = genderFlags[genderCode];
    return flag || genderCode;
}

export const handleMouseEnter = (event) => {
    event.currentTarget.style.backgroundColor = '#eee';
};

export const handleMouseLeave = (event) => {
    event.currentTarget.style.backgroundColor = '';
};
