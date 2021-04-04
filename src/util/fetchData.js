const axios = require('axios');

const fetch = (addr, APIkey) => {
  return axios
    .get(
      `https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${addr}&startblock=0&endblock=999999999&sort=asc&apikey=${APIkey}`
    )
    .then((res) => {
      const data = res.data.result;
      return data;
    });
};

const getBalance = async (addr, contactAddr, APIkey) => {
  const balance = await axios.get(
    `https://api-ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contactAddr}&address=${addr}&tag=latest&apikey=${APIkey}`
  );

  const balanceInInt = parseInt(balance.data.result) * Math.pow(10, -18);
  return balanceInInt;
};

module.exports.fetch = fetch;
module.exports.getBalance = getBalance;
