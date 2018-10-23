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

function Person(name) {
  this.name = name;
};

Person.prototype.myFriends5 = function(friends) {
  var arr = friends.map(function(el) {
    return this.name + ' is friends with ' + el;
  }.bind(this));

  console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);

//  ES6
Person.prototype.myFriends6 = function(friends) {
  var arr = friends.map(el => `${this.name} is friends with ${el}` );

  console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
new Person('Mike').myFriends5(friends);
