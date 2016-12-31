function getState(num) {
  var BINGO = "BINGO";
  var COLORS = ["red", "blue", "orange", "green", "purple"];

  var str = BINGO[(num - 1) / 15 | 0] + ('0' + num).substr(-2);
  var color = COLORS[(num - 1) / 15 | 0];

  return {str: str, color: color};
}
