const countryFlags = {
    PT: '🇵🇹', BRZ: '🇧🇷', ESP: '🇪🇸',
    FRA: '🇫🇷', ITA: '🇮🇹', GER: '🇩🇪',
    AUS: '🇦🇺', NED: '🇳🇱', GBR: '🇬🇧',
    USA: '🇺🇸', CAN: '🇨🇦', JPN: '🇯🇵',
    CHN: '🇨🇳', KOR: '🇰🇷', RUS: '🇷🇺',
    SWE: '🇸🇪', NOR: '🇳🇴', FIN: '🇫🇮',
    DEN: '🇩🇰', CZE: '🇨🇿', POL: '🇵🇱',
    HUN: '🇭🇺', AUT: '🇦🇹', SUI: '🇨🇭',
    BEL: '🇧🇪', IRL: '🇮🇪', POR: '🇵🇹',
    ARG: '🇦🇷', MEX: '🇲🇽', COL: '🇨🇴',
};

const genderFlags = {
    M: '👨', F: '👩',
};

/*const ageFlags = {
    0: '👶', 1: '👦', 2: '👧', 3: '👨', 4: '👩',
};*/

export const getCountryFlag = (countryCode) => {
    const flag = countryFlags[countryCode];
    return flag || countryCode;
}

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
