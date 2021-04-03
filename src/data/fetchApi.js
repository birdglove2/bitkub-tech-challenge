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

const getBalance = async (address, contactAddress) => {
  const data = await fetch(inputAddrs);

  let balance = await axios.get(
    // `https://api-ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${data[i].contractAddress}&address=${data[i].to}&tag=latest&apikey=${myAPIkey}`
    `https://api-ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contactAddress}&address=${address}&tag=latest&apikey=${myAPIkey}`
  );

  let balanceInInt = parseInt(balance.data.result) * Math.pow(10, -18);
  return balanceInInt;
};
// getBalance();

const fetching = async () => {
  const data = await fetch(inputAddrs);

  let resArr = [];
  for (let i = 0; i < data.length; i++) {
    inputAddrs = inputAddrs.toLocaleLowerCase();
    if (inputAddrs === data[i].from) {
      let balance = await getBalance(data[i].to, data[i].contractAddress);
      let obj = {
        TxHash: data[i].blockHash,
        from: data[i].from,
        to: data[i].to,
        amountTransfer: parseInt(data[i].value) * Math.pow(10, -18),
        balance: balance,
      };

      resArr.push(obj);
    }
  }
  console.log(resArr);
};

fetching();

// module.exports.fetch = fetch;
