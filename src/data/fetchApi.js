const axios = require('axios');

const myAPIkey = 'UBW64P8TP49U32GQ6J7R1QRBWWD2KMZBJW';
let data;
const fetch = (address) => {
  return axios
    .get(
      `https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=${myAPIkey}`
    )
    .then((res) => {
      data = res.data.result;
      return data;
    });
};

let inputAddrs = '0xEcA19B1a87442b0c25801B809bf567A6ca87B1da';
const fetching = async () => {
  const data = await fetch(inputAddrs);

  let resArr = [];
  for (let i = 0; i < data.length; i++) {
    inputAddrs = inputAddrs.toLocaleLowerCase();
    if (inputAddrs === data[i].from) {
      let balance = await axios.get(
        `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&address=${data[i].from}&tag=latest&apikey=${myAPIkey}`
      );

      let obj = {
        TxHash: data[i].blockHash,
        from: data[i].from,
        to: data[i].to,
        amountTransfer: data[i].value,
        balance: balance.data,
      };

      resArr.push(obj);
    }
  }
  console.log(resArr);
};

fetching();
// https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=0xEcA19B1a87442b0c25801B809bf567A6ca87B1da&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken

module.exports.fetch = fetch;
