const { fetch, getBalance } = require('./util/fetchData');

const myAPIkey = 'UBW64P8TP49U32GQ6J7R1QRBWWD2KMZBJW';
const inputAddrs = '0xEcA19B1a87442b0c25801B809bf567A6ca87B1da';
const contractAddress = '0x38e26c68bdef7c6e7f1aea94b7ceb8d95b11bd69';

let resArr = [];
const findRoute = async (addressFrom) => {
  const data = await fetch(addressFrom, myAPIkey);

  for (let i = 0; i < data.length; i++) {
    if (
      data[i].from.toLowerCase() === addressFrom.toLowerCase() &&
      data[i].tokenSymbol === 'BKTC'
    ) {
      resArr.push({
        TxHash: data[i].hash,
        from: data[i].from,
        to: data[i].to,
        amountTransfer: parseInt(data[i].value) * Math.pow(10, -18),
      });
      await findRoute(data[i].to);
    }
  }
};

const findBalance = async (address) => {
  let balance = await getBalance(address, contractAddress, myAPIkey);
  console.log(address, balance);
};

const start = async () => {
  // table 1
  await findRoute(inputAddrs);
  for (let i = 0; i < resArr.length; i++) {
    console.log(resArr[i].TxHash, resArr[i].from, resArr[i].to, resArr[i].amountTransfer);
  }

  // table 2 -- use data from table 1
  await findBalance(inputAddrs);
  for (let i = 0; i < resArr.length; i++) {
    await findBalance(resArr[i].to);
  }
};

start();
