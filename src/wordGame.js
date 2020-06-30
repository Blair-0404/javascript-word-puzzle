//html elements
let word1 = document.getElementById('word1'); //answer
let word2 = document.getElementById('word2'); //buttons
let check = document.getElementById('check'); //word1 === word2?
let progress = document.getElementById('progress'); //progress check
let time = document.getElementById('time');

//game objects
let game = {
  'btns': [],
  'maxPlay': 3,
  'current': 0
};

game.startTime = Date.now();

game.words = 'apple,linux,javascript,tutorial,codesquad,baby,girlfriend,legend'.split(',');

game.choose = function() {
  let idx = Math.floor(Math.random() * this.words.length);
  this.answer = this.words[idx];
  this.letters = this.answer.split('');
  word1.innerHTML = this.answer
};

game.addButtons = function() {
  for(let i= 0; i < this.letters.length; i++) {
    let btn = document.createElement('button');
    btn.innerHTML = this.letters[i];
    word2.appendChild(btn);
    this.btns.push(btn);
  }
};

game.removeButtons = function() {
  for(let i = 0; i < this.btns.length; i++) {
    word2.removeChild(this.btns[i]);
  }
  this.btns = []; // ??
};

game.checkGood = function() {
  return this.answer === this.letters.join('');
};

game.updateDisplay = function() {
  if(this.checkGood()) {
    check.innerHTML = '일치 합니다.';
  } else {
    check.innerHTML = '일치하지 않습니다.';
  }
};

game.init = function () {
  this.choose();
  this.addButtons();
  this.updateDisplay();
};
game.init(); // ??


game.copyBtnText = function() {
  for(let i = 0; i < this.letters.length; i++) {
    this.btns[i].innerHTML = this.letters[i]
  }
};

game.swap = function () {
  let tmp = [];

  while(this.letters.length !== 0) {
    let s = this.letters.pop();
    tmp.push(s);
  }
  this.letters = tmp;
  this.copyBtnText();
  this.updateDisplay();
};

game.rshift = function () {
  let s = this.letters.pop();
  this.letters.unshift(s);
  this.copyBtnText();
  this.updateDisplay();
};

game.lshift = function () {
  let s = this.letters.shift();
  this.letters.push(s);
  this.copyBtnText();
  this.updateDisplay();
};

game.progress = function () {
  if(this.checkGood()) {
    this.current++;
    this.removeButtons();
    this.init();
    this.shuffle(); // ??

    let str = '';

    for(let i = 0; i < this.current; i++) {
      str += 'O';
    }
    progress.innerHTML = str;
  }

  if(this.current === game.maxPlay) {
    let sec  = (Date.now() - this.startTime) / 1000; // ?
    alert("Good! Your Record: " + sec + " sec");
    clearInterval(x); // ?
    check.innerHTML = "Thanks for playing";
  }
};

game.shuffle = function() { // ?
  let toggle = Math.floor(Math.random() * 2) === 0;
  if(toggle) {
    this.swap();
  }

  let rmax = Math.max(this.answer.length - 2 , 1);
  let n = Math.floor(Math.random() * rmax) + 1;

  for(let i = 0; i < n; i++) {
    this.rshift();
  }
};
game.shuffle(); // ?

let updateTime = function() {
  let now = Date.now() - game.startTime;
  time.innerHTML = (now / 1000) + ' s';
};

let x =setInterval(updateTime, 50);

let Swap = function() {
  game.swap();
  game.progress();
};

let rShift = function () {
  game.rshift();
  game.progress();
};

let lShift = function () {
  game.lshift();
  game.progress();
};















