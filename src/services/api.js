import { create } from 'apisauce';
import { URL_API } from 'react-native-dotenv'

const api = create({
    baseURL: URL_API,
});

api.addResponseTransform(response => {
    if(!response.ok)
        throw response;
});

export default api;