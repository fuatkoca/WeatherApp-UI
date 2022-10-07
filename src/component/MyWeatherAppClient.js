import axios from "axios";

const BASE_URL = "http://localhost:8080";


const getAxiosIntance = () => {

    const axiosInstance = axios.create({
        headers: {
            
        }
    })
    return axiosInstance;
}



class MyWeatherAppClient {

   

    getRecordings(id) {
        return getAxiosIntance().get(BASE_URL + "/weather/get-by-id/"+id);
    }

}

export default new MyWeatherAppClient();