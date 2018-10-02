// var firstName = 'John';
// var age = 20;

// if (age < 13) {
//   console.log(firstName + ' is a boy.');
// } else if (age >= 13 && age < 20) {
//   console.log(firstName + ' is a teenager.');
// } else if (age > 20 && age < 30) {
//   console.log(firstName + ' is a young man.');
// } else {
//   console.log(firstName + ' is a man.');
// }


// var firstName = 'John';
// // var age = 16;

// // age >= 18 ? console.log(firstName + ' drinks beer.')
// // : console.log(firstName + ' drinks juice.');

// // var drink = age >= 18 ? 'beer' : 'juice';
// // console.log(drink);


// var job = 'instructor';
// switch (job) {
//   case 'teacher':
//   case 'instructor':
//     console.log(firstName + ' teaches kids how to code.');
//     break;
//   case 'driver':
//     console.log(firstName + ' drives an uber in Libson');
//     break;
//   case 'designer':
//     console.log(firstName + ' designs beautiful websites.');
//     break;
//   default:
//     console.log(firstName + ' does something else.');
// }

//  falsy values: undefined, null, 0, '', NaN
//  truthy values: NOT falsy values

// var height = 23;

// if (height || height == 0) {
//   console.log('Variable is defined.');
// } else {
//   console.log('Variable has NOT been defined');
// }

// if (height === '23') {
//   console.log('The == operator does type coercion!');
// }

// let johnTeamScores = [89, 120, 103];
// let mikeTeamScores = [116, 94, 123];
// let maryTeamScores = [97, 134, 105];

// let johnTeamAverage = getAverage(johnTeamScores);
// let mikeTeamAverage = getAverage(mikeTeamScores);
// let maryTeamAverage = getAverage(maryTeamScores);

// if (johnTeamAverage > mikeTeamAverage &&
//     johnTeamAverage > maryTeamAverage) {
//   console.log('John team wins with score:', johnTeamAverage);
// } else if (mikeTeamAverage > johnTeamAverage &&
//            mikeTeamAverage > maryTeamAverage) {
//   console.log('Mike team wins with score:', mikeTeamAverage);
// } else if (maryTeamAverage > johnTeamAverage &&
//            maryTeamAverage > mikeTeamAverage) {
//   console.log('Mary wins with the score:', maryTeamAverage);
// } else {
//   console.log('Nobody wins');
// }

// function getAverage(arr) {
//   return arr.reduce((prev, curr) => {
//     prev += curr;
//     return prev;
//   }, 0) / arr.length;
// }

// let mikeTeamAverage

// let john = ['John', 'Smith', 1990, 'teacher', true];
// john.forEach((item) => {
//   console.log(typeof item);
// });

// console.log(john);
// let johnBills = [124, 48, 268];

// let johnTips = johnBills.map((item) => {
//   return getTip(item);
// });

// let johnFinal = johnBills.map((item, index) => {
//   return item + johnTips[index];
// });

// console.log(johnBills, '\n', johnTips, '\n', johnFinal);

// function getTip(bill) {
//   if (bill <= 50) {
//     return bill * 0.2;
//   } else if (bill > 50 && bill <= 200) {
//     return bill * 0.15;
//   } else {
//     return bill * 0.1;
//   }
// }

// let john = {
//   fullName: 'John Smith',
//   mass: 78,
//   height: 1.79,
//   calcBMI: function() {
//     return this.BMI = this.mass / this.height ** 2;
//   }
// }

// let mark = {
//   fullName: 'Mark Lern',
//   mass: 84,
//   height: 1.86,
//   calcBMI: function() {
//     return this.BMI = this.mass / this.height ** 2;
//   }
// }

// if ()

// for (let i = 5; i > 0; --i) {
//   console.log(i);
// }

let getJohnTip = getTipFunction();
let getMarkTip = getTipFunction(0.2, 0.1, 0.25);

let johnBills = [124, 48, 268];
let markBills = [77, 375, 110];

let johnTips = johnBills.map((item) => {
  return getJohnTip(item);
});

let johnFinal = johnBills.map((item, index) => {
  return item + johnTips[index];
});

let markTips = markBills.map((item) => {
  return getMarkTip(item);
});

let markFinal = markBills.map((item, index) => {
  return item + markTips[index];
});

console.log(johnBills, '\n', johnTips, '\n', johnFinal);
console.log(markBills, '\n', markTips, '\n', markFinal);

function getTipFunction(first=0.2, sec=0.15, last=0.1) {
  return function(bill) {
    if (bill <= 50) {
      return bill * first;
    } else if (bill > 50 && bill <= 200) {
      return bill * sec;
    } else {
      return bill * last;
    }
  }
}


