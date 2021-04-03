// var api = require('etherscan-api').init('UBW64P8TP49U32GQ6J7R1QRBWWD2KMZBJW');
// var balance = api.account.balance('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae');
// balance.then(function (balanceData) {
//   console.log(balanceData);
// });

// var api = require('etherscan-api').init('UBW64P8TP49U32GQ6J7R1QRBWWD2KMZBJW', 'rinkeby', '3000');

// console.log(api);

const { fetch } = require('./data/fetchApi');

const f = async () => {
  fetch('0xEcA19B1a87442b0c25801B809bf567A6ca87B1da').then((data) => {
    console.log(data);
  });
};
f();
// fetch().then((res) => console.log(res));
// console.log('dd', ei);

const input = ['นายฮัรโกบิณด์', 'gobind@BTC.com', '0xEcA19B1a87442b0c25801B809bf567A6ca87B1da'];

const output = ['Tx hash', 'from', 'to', 'Amount Transfer', 'Address', 'Balance'];
