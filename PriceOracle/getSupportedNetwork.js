import axios from "axios";
import crypto from "crypto"
import moment from "moment";
import dotenv from "dotenv"
dotenv.config()

const URL = `https://sandbox.thirdfi.org/api/v1/price-feed`
const METHOD = 'GET'
const timestamp = moment().unix()

// API Call using axios

let config = {
    method: METHOD,
    maxBodyLength: Infinity,
    url: URL
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data, null, 4));
    })
    .catch((error) => {
        console.log(error);
    });
