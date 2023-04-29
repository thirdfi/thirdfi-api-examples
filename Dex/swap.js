import axios from "axios";
import crypto from "crypto"
import moment from "moment";
import dotenv from "dotenv"
dotenv.config()

let data = JSON.stringify({
    "tokenIn" :"USDC",
    "tokenOut": "WBTC",
    "amount": "10",
    "chain":"mumbai",
    "isNative": false,
    "slippagePercentage": "5",
    "exactIn": true,
    "userEmail": "abc@test.com",
    "successURL": "https://app.thirdfi.org/",
    "cancelURL": "https://app.thirdfi.org/"
});

const URL = `https://sandbox.thirdfi.org/api/v1/sessions/swap`
const METHOD = 'POST'
const timestamp = moment().unix()
let baseString = `${URL}&method=${METHOD}&timestamp=${timestamp}&body=${JSON.stringify(JSON.parse(data))}`

const hash = crypto.createHmac('sha256', process.env.SECRET).update(baseString).digest('hex');



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
    data: data
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
