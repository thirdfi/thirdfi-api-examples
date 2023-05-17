import axios from "axios";
import crypto from "crypto"
import moment from "moment";
import dotenv from "dotenv"
dotenv.config()

const network = 'ETH'
const pair = 'ETHUSD'
const URL = `https://sandbox.thirdfi.org/api/v1/price-feed/get-price?network=${network}&pair=${pair}`
const METHOD = 'GET'
const timestamp = moment().unix()

// baseString updates with timestamp
let baseString = `${URL}&method=${METHOD}&timestamp=${timestamp}`

// Create hash based on baseString
const hash = crypto.createHmac('sha256', process.env.SECRET).update(baseString).digest('hex');


// API Call using axios

let config = {
    method: METHOD,
    maxBodyLength: Infinity,
    url: URL,
    headers: {
        'x-sec-key': process.env.API_KEY,
        'x-sec-ts': timestamp,
        'x-sec-sign': hash,
        'Content-Type': 'application/json'
    },
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data, null, 4));
    })
    .catch((error) => {
        console.log(error);
    });
