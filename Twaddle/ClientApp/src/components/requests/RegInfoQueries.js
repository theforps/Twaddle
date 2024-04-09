import axios from "axios";

export const GetCountries = async() => {
    
    const jwt = "hJs8oMXQudaDEixZq5I-3hDB1f71x9";
    
    const data = await axios.get('https://data-api.oxilor.com/rest/countries', {
        headers: {
            Authorization: "Bearer " + jwt,
        }
    });
    
    
    
    return data.data;
    
};