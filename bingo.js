const MAX = 75;

function shuffled() {
  let numbers = Array.from({length: MAX}, (_, i) => i + 1);
  let n = MAX;

  while (n) {
    let i = Math.floor(Math.random() * n--);
    let t = numbers[n];
    numbers[n] = numbers[i];
    numbers[i] = t;
  }

  return numbers;
}

function defaultResult() {
  return new Array(MAX + 1).fill(false);
}

module.exports = {
  shuffled,
  defaultResult
}
