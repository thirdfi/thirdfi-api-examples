import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import dotenv from "dotenv"
dotenv.config()

let data = JSON.stringify({
    "cryptoAmount": 1,
    "cryptoCurrency": "ETH",
    "fiatCurrency": "USD",
    "isBuyOrSell": "BUY",
    "network": "ethereum",
    "paymentMethod": "credit_debit_card"
});

const URL = `https://sandbox.thirdfi.org/api/v1/payment/currency-price`
const METHOD = 'POST'
const timestamp = moment().unix()
let baseString = `${URL}&method=${METHOD}&timestamp=${timestamp}&body=${JSON.stringify(JSON.parse(data))}`

const hash = CryptoJS.HmacSHA256(baseString, process.env.SECRET).toString(
    CryptoJS.enc.Hex,
)


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
