//  Lecture: let and const

// //  ES5
// var name5 = 'Jane Smith';
// var age = 23;
// name5 = 'Jane Miller';
// console.log(name5);

// //  ES6
// const name6 = 'Jane Smith';
// let age6 = 23;
// name6 = 'Jane Miller';
// console.log(name6);

//  ES5
// function driversLicense5(passedTest) {
//   if (passedTest) {
//     var firstName = 'John';
//     var yearOfBirth = 1990;

//     console.log(firstName, 'born in', yearOfBirth + ',', 'is now allowed to drive the car');
//   }
// };

// driversLicense5(true);

// //  ES6
// function driversLicense6(passedTest) {
//   if (passedTest) {
//     let firstName = 'John';
//     const yearOfBirth = 1990;
//     console.log(firstName, 'born in', yearOfBirth + ',', 'is now allowed to drive the car');
//   }
// };

// {
//   const a = 1;
//   let b = 2;
// }

// console.log(a + b);

// let firstName = 'john';
// let lastName = 'Smith';
// const yearOfBirth = 1990;
// function calcAge(year) {
//   return 2016 - year;
// }

// //  ES5
// console.log('This is ' + firstName + ' ' + lastName + ' born in ' + calcAge(yearOfBirth));

// const years = [1990, 1965, 1982, 1937];

// //  ES5
// var ages5 = years.map(function(el) {
//   return 2016 - el;
// });

// console.log(ages5);

// //  ES6
// const ages6 = years.map(el => 2016 - el);
// console.log(ages6);

// var box5 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     var self = this;
//     document.querySelector('.green').addEventListener('click', function() {
//       var str = 'This is box number ' + self.position + ' and it is ' + self.color;
//       console.log(str);
//     })
//   }
// };

// // box5.clickMe();

// const box6 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     document.querySelector('.green').addEventListener('click', () => {
//       var str = 'This is box number ' + this.position + ' and it is ' + this.color;
//       console.log(str);
//     })
//   }
// };

// box6.clickMe();

// function Person(name) {
//   this.name = name;
// };

// Person.prototype.myFriends5 = function(friends) {
//   var arr = friends.map(function(el) {
//     return this.name + ' is friends with ' + el;
//   }.bind(this));

//   console.log(arr);
// };

// var friends = ['Bob', 'Jane', 'Mark'];
// new Person('John').myFriends5(friends);

// //  ES6
// Person.prototype.myFriends6 = function(friends) {
//   var arr = friends.map(el => `${this.name} is friends with ${el}` );

//   console.log(arr);
// };

// var friends = ['Bob', 'Jane', 'Mark'];
// new Person('Mike').myFriends5(friends);

//  ES5
// var john = ['John', 26];
// var name = john[0];
// var age = john[1];

//  ES6
// const [name, age] = ['John', 26];
// console.log(name);
// console.log(age);

// const obj = {
//   firstName: 'John',
//   lastName: 'Smith'
// };

// const  { firstName, lastName } = obj;
// console.log(firstName);
// console.log(lastName);

// const { firstName: a, lastName: b } = obj;
// console.log(a);
// console.log(b);


// function calcAgeRet(year) {
//   const age = new Date().getFullYear() - year;
//   return [age, 65 - age];
// };

// const [age, retirement] = calcAgeRet(1995);
// console.log(age, retirement);

// const boxes = document.querySelectorAll('.box');

//  ES5
// var boxesArr5 = Array.prototype.slice.call(boxes);
// boxesArr5.forEach(function(cur) {
//   cur.style.backgroundColor = 'dodgerblue';
// });


//  ES6
// const boxesArr6 = Array.from(boxes);

//  ES5
// for (var i = 0; i < boxesArr5.length; i++) {
//   if (boxesArr5[i].className === 'box blue') {
//     // continue;
//     break;
//   }
//   boxesArr5[i].textContent = 'I changed to blue!';
// }

//  ES6
// for (const cur of boxesArr6) {
//   if (cur.className.includes('blue')) {
//     continue;
//   }
//   cur.textContent = 'I changed to blue!';
// };

// //  ES5
// var ages = [12, 17, 8, 21, 14, 11];
// var full = ages.map(function(cur) {
//   return cur >= 18;
// });
// console.log(full.indexOf(true));
// console.log(ages[full.indexOf(true)]);

// //  ES6
// console.log( ages.findIndex(cur => cur >= 18) );

// console.log(ages.find(cur => cur >= 74347));

// function addFourAges(a, b, c, d) {
//   return a + b + c + d;
// };

// var sum1 = addFourAges(18, 30, 12, 21);
// console.log(sum1);

// //  ES5
// var ages = [18, 30, 12, 21];
// var sum2 = addFourAges.apply(null, ages);
// console.log(sum2);

// //  ES6
// const sum3 = addFourAges(...ages);
// console.log(sum3);

// const familySmith = ['John', 'Jane', 'Mark'];
// const familyMiller = ['Mary', 'Bob', 'Ann'];
// const bigFamily = [...familySmith, ...familyMiller];
// console.log(bigFamily);

//  ES5
// function isFullAge5() {
//   // console.log(arguments);
//   var argsArr = Array.prototype.slice.call(arguments);
//   argsArr.forEach(function(cur) {
//     console.log(2016 - cur >= 18);
//   });
// };

// isFullAge5(1990, 2007, 1993, 1984, 1954);

//  ES6
// function isFullAge6(...years) {
//   years.forEach(cur => console.log( (2016 - cur) >= 18 ));
// };

// isFullAge6(1990, 2007, 1993, 1984, 1954);

// function SmithPerson(fn, yob, ln, n) {
//   this.fn = fn;
//   this.yob = yob;
//   this.ln = ln;
//   this.n = n;
// };

// var john = new SmithPerson('John', 1990);

// console.log(john);

// const question = new Map();
// question.set('question', 'What is the official name of the latest major JS version?');
// question.set(1, 'ES5');
// question.set(2, 'ES6');
// question.set(3, 'ES2015');
// question.set(4, 'ES7');
// question.set('correct', 3);
// question.set(true, 'Correct answer :D');
// question.set(false, 'Wrong, please try again!');



// if (question.has(4)) {
//   question.delete(4);
// }



// // question.forEach((val, key) => {
// //   console.log(`${key} => ${val}`);
// // });

// for (let [key, val] of question.entries()) {
//   if (typeof(key) === 'number') {
//     console.log(`${key} => ${val}`);
//   }
// }

//  ES5
// var Person5 = function(name, yob, job) {
//   this.name = name;
//   this.yearOfBirth = yob;
//   this.job = job;
// };

// Person5.prototype.calculateAge = function() {
//   var age = new Date().getFullYear() - this.yearOfBirth;
//   console.log(age);
// };

// var john5 = new Person5('John', 1990, 'teacher');

// //  ES6
// class Person6 {
//   constructor(name, yob, job) {
//     this.name = name;
//     this.yob = yob;
//     this.job = job;
//   };

//   calculateAge() {
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
//   };

//   static greeting() {
//     console.log('Hey there');
//   }
// };

// const john6 = new Person6('John', 1990, 'teacher');

// console.log(john5, john6);

// Person6.greeting();
// // john6.greeting();

// var Person5 = function(name, yearOfBirth, job) {
//   this.name = name;
//   this.yearOfBirth = yearOfBirth;
//   this.job = job;
// };

// Person5.prototype.calcAge = function() {
//   var age = new Date().getFullYear() - this.yearOfBirth;
//   console.log(age);
// };

// var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
//   Person5.call(this, name, yearOfBirth, job);
//   this.olympicGames = olympicGames;
//   this.medals = medals;
// }

// Athlete5.prototype = Object.create(Person5.prototype);

// Athlete5.prototype.wonMedal = function() {
//   this.medals++;
//   console.log(this.medals);
// };

// var JohnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

// JohnAthlete5.calcAge();
// JohnAthlete5.wonMedal();
// JohnAthlete5.wonMedal();

// JohnAthlete5.wonMedal();

// JohnAthlete5.wonMedal();\


// class Person6 {
//   constructor(name, yearOfBirth, job ) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
//   };

//   calcAge() {
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
//   };
// };

// class Athlete6 extends Person6 {
//   constructor(name, yob, job, olg, med) {
//     super(name,yob,job);
//     this.olympicGames = olg;
//     this.medals = med;
//   };

//   wonMedal() {
//     this.medals++;
//     console.log(this.medals);
//   };
// };

// const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);
// johnAthlete6.wonMedal();
// johnAthlete6.calcAge();

class DistrictSubject {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  };
};

class Park extends DistrictSubject {
  constructor(name, buildYear, numOfTrees, area) {
    super(name, buildYear);
    this.numOfTrees = numOfTrees;
    this.area = area;
  };

  getDensity() {
    return this.numOfTrees / this.area;
  };
};

class Street extends DistrictSubject {
  constructor(name, buildYear, length) {
    super(name, buildYear);
    this.length = length;
  };

  getClassification() {
    let classification;
    
    if (this.length !== 0 && !this.length) classification = 'default'
    if (this.length <= 4) classification = 'tiny';
    else if (this.length <= 8) classification = 'small';
    else if (this.length <= 12) classification = 'normal';
    else if (this.length <= 16) classification = 'big';
    else if (this.length <= 20) classification = 'huge';

    return classification;
  };
};

const parks = [
  new Park('Park A', 1911, 1200, 12),
  new Park('Park B', 1922, 823, 9),
  new Park('Park C', 1933, 491, 6)
];

const streets = [
  new Street('Street X', 1963, 20),
  new Street('Street Y', 1979, 13),
  new Street('Street Z', 1992, 7),
  new Street('Street XYZ', 2001, 3)
];

const report = () => {

  let densities = [];
  let averageAge = 0;

  console.log(`Names of parks that have more than 1000 trees:`);
  for (let park of parks) {
    averageAge += (new Date().getFullYear() - park.buildYear);
    densities.push(park.getDensity());
  };

  console.log(`Large park: ${parks.find(el => el.numOfTrees >= 1000).name}`);

  console.log(`Average age of all parks: ${averageAge / parks.length}`);


  let averageLength = 0;

  for (let street of streets) {
    console.log(`Class of ${street.name}: ${street.getClassification()};`);
    averageLength += street.length;
  };

  console.log(
    `Total length of all streets: ${averageLength};\n
    Average length of all streets: ${averageLength / streets.length};`
  );
};

report();


