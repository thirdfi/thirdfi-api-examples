import axios from "axios";
import crypto from "crypto"
import moment from "moment";
import dotenv from "dotenv"
dotenv.config()


// bodyData is required for POST request
let data = JSON.stringify({
    "product": "LCI",
    "type": "withdraw",
    "amount": 0.1,
    "userEmail": process.env.USER_MAIL,
    "successURL": "https://app.thirdfi.org/",
    "cancelURL": "https://app.thirdfi.org/"
});


const URL = `https://sandbox.thirdfi.org/api/v1/sessions`
const METHOD = 'POST'
const timestamp = moment().unix()

// baseString updates with timestamp
let baseString = `${URL}&method=${METHOD}&timestamp=${timestamp}&body=${JSON.stringify(JSON.parse(data))}`

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
    data: data
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
