import axios from "axios";

export const GetCountries = async() => {
    
    const data = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images');
    
    return data.data.data.map(
        entity => {
            const country = entity.name;
            const flag = entity.flag;

            return {country, flag}
        }
    );
};