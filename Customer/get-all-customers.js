import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import dotenv from "dotenv"
dotenv.config()

const URL = 'https://sandbox.thirdfi.org/api/v1/customers'
const method = 'GET'
const timestamp = moment().unix()
let baseString = `${URL}&method=${method}&timestamp=${timestamp}`

const hash = CryptoJS.HmacSHA256(
    baseString, process.env.SECRET
).toString(CryptoJS.enc.Hex)

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: URL,
    headers: {
        'x-sec-key': process.env.API_KEY,
        'x-sec-ts': timestamp,
        'x-sec-sign': hash
    }
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
