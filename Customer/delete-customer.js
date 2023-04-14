import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import dotenv from "dotenv"
dotenv.config()

const custID = 906
const URL = `https://sandbox.thirdfi.org/api/v1/customers/${custID}`
const METHOD = 'DELETE'
const timestamp = moment().unix()
let baseString = `${URL}&method=${METHOD}&timestamp=${timestamp}`

const hash = CryptoJS.HmacSHA256(baseString, process.env.SECRET).toString(
    CryptoJS.enc.Hex,
)


let config = {
    method: 'delete',
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