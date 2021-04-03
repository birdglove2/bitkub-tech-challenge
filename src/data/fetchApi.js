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
  const balance = await axios.get(
    `https://api-ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contactAddress}&address=${address}&tag=latest&apikey=${myAPIkey}`
  );

  const balanceInInt = parseInt(balance.data.result) * Math.pow(10, -18);
  return balanceInInt;
};

const firstTable = async () => {
  const data = await fetch(inputAddrs);

  let resArr = [];
  for (let i = 0; i < data.length; i++) {
    inputAddrs = inputAddrs.toLocaleLowerCase();
    if (inputAddrs === data[i].from) {
      let obj = {
        TxHash: data[i].blockHash,
        from: data[i].from,
        to: data[i].to,
        amountTransfer: parseInt(data[i].value) * Math.pow(10, -18),
      };

      resArr.push(obj);
    }
  }
  console.log(resArr);
};

const secondTable = async () => {
  const data = await fetch(inputAddrs);

  let resArr = [];
  let balance = await getBalance(inputAddrs, '0xb336aef321adc0fd059acb0be07a0c649ba40af3');
  const firstObj = {
    Address: inputAddrs,
    Balance: balance,
  };
  resArr.push(firstObj);

  for (let i = 0; i < data.length; i++) {
    inputAddrs = inputAddrs.toLocaleLowerCase();

    if (inputAddrs === data[i].from) {
      let balance = await getBalance(data[i].to, data[i].contractAddress);
      let obj = {
        Address: data[i].from,
        Balance: balance,
      };

      resArr.push(obj);
    }
  }
  console.log(resArr);
};

firstTable();
secondTable();

// module.exports.fetch = fetch;
