function getStocksOver(stocks, minPrice) {
  return stocks.filter(function(stock) {
    return stock.price >= minPrice;
  });
}

Array.prototype.filter = function(predicate) {
  var results = [];

  this.forEach(function(item) {
    if(predicate(item)) {
      results.push(item);
    }
  });

  return results;
};

var expensiveStocks = getStocksOver([
  {symbol: "XFX", price: 240.22, volume: 23432},
  {symbol: "TNZ", price: 332.19, volume: 234},
  {symbol: "JXJ", price: 120.22, volume: 5323}
], 150.00);

console.log(JSON.stringify(expensiveStocks));
