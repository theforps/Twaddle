import axios from "axios";

export const GetCountries = async() => {
    
    const data = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images');

    console.log(data)
    
    const result = data.data.data.map(
        entity => {
            const country = entity.name;
            const flag = entity.flag;

            return {country, flag}
        }
    );

    return result
};