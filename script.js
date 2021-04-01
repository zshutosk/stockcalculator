const shareEl = document.getElementById('shareamount');
const tickerEl = document.getElementById('ticker');
const ticker2El = document.getElementById('ticker2');
const priceEl = document.getElementById('priceamount');
const swap = document.getElementById('swap');

//checkbox hider

$(".currency").hide();
$(".one-box").click(function() {
    if($(this).is(":checked")) {
        $(".currency").show();
    } else {
        $(".currency").hide();
    }
});

$(".crypto").hide();
$(".two-box").click(function() {
    if($(this).is(":checked")) {
        $(".crypto").show();
    } else {
        $(".crypto").hide();
    }
});


//Api fetcher to input box
function calculate() {
  const ticker = tickerEl.value;
  const ticker2 = ticker2El.value;
  const shareamount = shareEl.value;
  const firstAPICall = fetch(`https://api.marketstack.com/v1/intraday/latest?access_key=ba78398902bcc118daea73d8d09cf4ea&symbols=${ticker}`)
  const secondAPICall = fetch(`https://min-api.cryptocompare.com/data/price?fsym=${ticker2}&tsyms=USD&api_key={4c6ca0b11de29c60dfa3df49a2d344b9421dded9635f0c25e7550fa9c6187eb3}`);

  Promise.all([firstAPICall, secondAPICall])
  .then(values => Promise.all(values.map(value => value.json())))
  .then(data => {
    //last stock
  const lastprice = data[0]['data']['0']['last'];
   //last crypto
   const lastcoin = data[1]['USD'];
   const priceamount = (lastprice * shareamount);
   const coinamount = (lastcoin * shareamount);
   document.getElementById('priceamount').value = ('$' + priceamount);
   document.getElementById('coinamount').value = ('$' + coinamount);

  });

}

//Event listeners
shareEl.addEventListener('input', calculate);
tickerEl.addEventListener('change', calculate);
ticker2El.addEventListener('change', calculate);
priceEl.addEventListener('input', calculate);

calculate();

