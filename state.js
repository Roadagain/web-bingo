function getState(num) {
  var BINGO = "BINGO";

  var symbol = BINGO[(num - 1) / 15 | 0];
  var str = symbol + ('0' + num).substr(-2);

  return {str: str, symbol: symbol};
}
