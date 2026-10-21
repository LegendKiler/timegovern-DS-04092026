export const COUNTRY_PROFILES = {

}

export const getAllCountries = () => Object.values(COUNTRY_PROFILES);
export const getCountryProfile = (code) => COUNTRY_PROFILES[code.toLowerCase()];