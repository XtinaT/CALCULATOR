"use strict";
function calculator(string) {
  var operations = { "(": 1, ")": 1, "*": 3, "/": 3, "+": 2, "-": 2 };
  var newArray = [];
  for (var i = 0; i < string.length; i++) {
    if (string[i] in operations && string[i] != '(' && string[i] != ')' && string[i + 1] in operations && string[i + 1] != '(' && string[i + 1] != ')') {
      if (string[i + 2] == '(') {
        var a = i + 1;
        var count1 = 1;
        var count2 = 0;
        while (count1 != count2) {
          i++;
          if (string[i + 2] == '(') count1++;
          if (string[i + 2] == ')') count2++;
        }
        var b = i + 2;
        var part1 = string.substr(0, a);
        var part2 = string.slice(a, b);
        var part3 = string.substr(b);
        string = part1 + '(' + part2 + ')' + part3;
      } else {
        var a = i + 1;
        var b = i + 2;
        while (!(string[b + 1] in operations)) {
          b++;
        }
        var part1 = string.substr(0, a);
        var part2 = string.slice(a, b + 1);
        var part3 = string.substr(b + 1);
        string = part1 + '(' + part2 + ')' + part3;

      }

    }
  }
  var sArray = string.split('');
  for (var i = 0; i < sArray.length; i++) {
    var str = '';
    while (isFinite(sArray[i]) || sArray[i] == '.' && i < sArray.length) {
      str += sArray[i];
      i++;
    }
    if (str != '') newArray.push(str);
    if (i < sArray.length) newArray.push(sArray[i]);
  }
  var stack = [];
  var string = [];

  for (var i = 0; i < newArray.length; i++) {
    var elem = newArray[i];
    var nextElem = newArray[i + 1];
    if (isFinite(elem)) {
      string.push(elem);
    } else {
      if (elem in operations && stack.length == 0) {
        stack.push(elem);
      } else if (elem in operations && stack.length != 0) {
        if (elem == '(' && nextElem == '-') {
          stack.push(elem);
          string.push(0);
        } else if (elem == '(') stack.push(elem);
        else if (elem == ')') {
          while (stack[stack.length - 1] != '(') {
            var lastElem = stack.pop();
            string.push(lastElem);
          } stack.pop();

        } else if (operations[elem] > operations[stack[stack.length - 1]]) {
          stack.push(elem);
        } else {
          while (operations[elem] < operations[stack[stack.length - 1]] || operations[elem] == operations[stack[stack.length - 1]]) {
            var lastElem = stack.pop();
            string.push(lastElem);
          } stack.push(elem);
        }

      }
    }
  }

  while (stack.length != 0) {
    var lastElem = stack.pop();
    string.push(lastElem);
  }

  function count(string) {
    var stack = [];
    for (var i = 0; i < string.length; i++) {
      var elem = string[i];
      if (isFinite(elem)) {
        stack.push(elem);
      } else {
        var a = stack.pop();
        var b;
        if (stack.length == 0) {
          b = 0;
        } else b = stack.pop();
        var c;
        switch (elem) {
          case '+':
            c = +a + +b;
            stack.push(Math.round(c / 0.01) * 0.01);
            break;
          case '-':
            c = b - a;
            stack.push(Math.round(c / 0.01) * 0.01);
            break;
          case '*':
            c = a * b;
            stack.push(Math.round(c / 0.01) * 0.01);
            break;
          case '/':
            c = b / a;
            stack.push(Math.round(c / 0.01) * 0.01);
            break;
        }
      }
    } return stack[0];
  }
  return count(string);
}

var askedString = prompt('Введите выражение');
alert("Ответ: " + calculator(askedString));

function test() {
  var testSet = [
    ['3.9+4.1', 8],
    ['3.112+4.557321', 7.67],
    ['2+11*(10/3)', 38.63],
    ['1230+3210', 4440],
    ["55+6+(7*8)", 117],
    ["1+2*3", 7],
    ["55+6-(7*8)", 5],
    ["55+6+(7+8)", 76],
    ["55+6+(7-8)", 60],
    ["55+6+(16/8)", 63],
    ["55+6-(7-8)", 62],
    ["(1+(1+1)+1)+1", 5],
    ["(1+(1+1)+(1+1))+1", 6],
    ["(1-1)+(1+1)", 2],
    ["(1*(1+1)+(1+1))-1-1", 2],
    ["(1-1)+(1+1)", 2],
    ["-55+6+(7*8)", 7],
    ["55+6+(-56)", 5],
    ["1+6+(-5)", 2],
    ["-1+6+(-5)", 0],
    ["(-55)+6+(7*8)", 7],
    ['(-55)+6+(7*8)+(1+1)', 9],
    ["(1-2+(1+2))", 2],
    ["55+6/(-1-2)", 53],
    ["2*-(2+3+(2+3))+1*(2+3)", -15],
    ["2*-(2+3)", -10],
    ["2/-2*(1+1)", -2],
  ];
  var countPassed = 0;
  var countFailed = 0;
  for (var unit of testSet) {
    if (calculator(unit[0]) == unit[1]) {
      countPassed++;
    } else countFailed++;
  }
  console.log(
    `Успешно пройдено: ${countPassed} теста\nНе пройдено: ${countFailed} тестов`
  );
}
test();