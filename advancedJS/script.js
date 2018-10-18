//  Function constructor
/*
var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person.prototype.calculateAge = function() {
  console.log(
    new Date().getFullYear() - this.yearOfBirth
  );
};

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');
john.calculateAge();
jane.calculateAge();
mark.calculateAge();
*/



//  Object.create
// var personProto = {
//   calculateAge: function() {
//     console.log(new Date().getFullYear() - this.yearOfBirth);
//   }
// };

// var john = Object.create(personProto);
// john.name = "John";
// john.yearOfBirth = 1990;
// john.job = 'teacher';

// var jane = Object.create(personProto, {
//   name: { value: 'Jane' },
//   yearOfBirth: { value: 1969 },
//   job: { value: 'Designer' }
// });

// var years = [1990, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, fn) {
//   var arrRes = [];
//   for (var i = 0; i < arr.length; i++) {
//     arrRes.push(fn(arr[i]));
//   }
//   return arrRes;
// };

// function calculateAge(el) {
//   return 2016 - el;
// };

// function isFullAge(el) {
//   return el >= 18;
// };

// function maxHeartRate(el) {
//   if (el >= 18 && el <= 81) {
//     return Math.round( 206.9 - (0.67 * el) );
//   } else {
//     return -1;
//   }
// };

// var ages = arrayCalc(years, calculateAge);
// var fullAges = arrayCalc(ages, isFullAge);
// var rates = arrayCalc(ages, maxHeartRate);
// console.log(ages);
// console.log(fullAges);
// console.log(rates);

// function interviewQuestion(job) {
//   if (job === 'designer') {
//     return function(name) {
//       console.log(name + ', what is UX design?');
//     };
//   } else if (job === 'teacher') {
//     return function(name) {
//       console.log('What subject do you teach, ' + name + '?');
//     };
//   } else {
//     return function(name) {
//       console.log('Hello ' + name + ', what do you do?');
//     };
//   }
// };

// var teacherQuestion = interviewQuestion('teacher');
// teacherQuestion('Pidor');

// var designerQuestion = interviewQuestion('designer');
// designerQuestion('John');

// function game() {
//   var score = Math.random() * 10;
//   console.log(score >= 5);
// }
// game();

// (function() {
//   var score = Math.random() * 10;
//   console.log(score >= 5);
// })();

// console.log(score);

// (function(goodLuck) {
//   var score = Math.random() * 10;
//   console.log(score >= 5 - goodLuck);
// })(3);

// function retirement(retirementAge) {
//   var a = ' years left untill retirement.';
//   return function(yearOfBirth) {
//     var age = 2016 - yearOfBirth;
//     console.log((retirementAge - age) + a);
//   };
// };

// var retirementUS = retirement(66);
// var retirementGermany = retirement(65);
// var retirementIceland = retirement(67);

// retirementUS(1990);
// retirementGermany(1990);
// retirementIceland(1990);

// function interviewQuestion(job) {
//   return function(name) {
//     var question;
//     switch(job) {
//       case 'designer':
//         question = ', what is UX design?';
//         break;
//       case('teacher'):
//         question = ', what subject do you teach?';
//         break;
//       default:
//         question = ', hello, what do you do?';
//         break;
//     };
//     console.log(name + question);
//   };
// };

// interviewQuestion('designer')('Mark');

// var john = {
//   name: 'John',
//   age: 26,
//   job: 'teacher',
//   presentation: function(style, timeOfDay) {
//     if (style === 'formal') {
//       console.log(`Good ${timeOfDay}, ladies & gentlemens, I'm a ${this.job}, and I'm a ${this.age} age.`);
//     } else if (style === 'friendly') {
//       console.log(`Hi, mr. Pidor. It's Johnny, & I gonna f*ck your wife!`);
//     }
//   }
// };

// john.presentation('friendly', 'evening');

// var emily = {
//   name: 'Emily',
//   age: 35,
//   job: 'designer'
// };

// john.presentation.call(emily, 'formal', 'afternoon');

// var johnFriendly = john.presentation.bind(john, 'friendly');
// console.log(johnFriendly);
// johnFriendly('morning');

function Question(question, answers, correct) { 
  this.askQuestion = function() {
    console.log(question);
    answers.forEach((item, i) => {
      console.log(`\t${i + 1}.`,item);
    });
    const answer = prompt('Please, select correct answer');
    if (!answer) {
      return -1;
    } else if (parseInt(answer) === correct) {
      console.log('You\'re right!');
    } else {
      console.log('You\'re wrong!');
    }
    this.nextQuestion();
  };
  this.nextQuestion = function() {
    arr[Math.floor( Math.random() * 3 )].askQuestion();
  };
};
const arr = [
  new Question('What is my name?', ['John', 'Adam', 'Tommy', 'Michael', 'Ron'], 3),
  new Question('What is my job?', ['Coder', 'Driver', 'asg', 'dhsddhs', 'jkf'], 1),
  new Question('What is my city?', ['NY', 'Denver', 'Miami', 'Ekat', 'Seattle'], 4)
];
arr[0].askQuestion();



