console.log("JavaScript - ES6");


// ---HOISTING---
// the hosting effect can be seen with "var" and with "function"
// as you can see we use "a" but it si not declared yet
// "a" is declared at line 21 but the javascript engine when using "var" for  variable declaration will move the declaration at the top of the file before running the program
// 'a' will have undefined value but will not throw and error ;
console.log(a); 

a = 7;
console.log(a);


// if you uncomment the instruction below JavaScript will throw an error, because in case of declaring a variable with let you can't use it before it is declared
// this is the desired way of declaring a variable
// same with declaring const
// console.log(b);
let b;
console.log(b);
b = 7;
console.log(b);


var a = 6;
console.log(a);

// a variable declared with "let" is is code block scoped
// this is visible when declaring a variable in 2 different scopes with same name
let c = "a sentence";
console.log(c);
if (true) {
    // this variable it is a different one then from the one above even if they have the same name
    // in this code block and in this local scop you can't get or refer to the "c" value from outside anymore
    let c = "a word";
    console.log(c);
}
console.log(c);


// a variable declared with "var" is function scoped, which mean it has a larger scope
// for the case below the "x" variable from outside if is the same as the one from inside even if it seam like there are 2 declarations
// this is not desired but is it is how JavaScript es5 works
var x = "a sentence";
console.log(x);
if (true) {
    var x = "a word";
    console.log(x);
}
console.log(x);


// like is mentioned before in case of the function scope, var behaves as expected, thus "y" from outside the function is different from "y" inside the function
var y = 1;
increment();
// named function
function increment() {
    var y = 2;
    y++;
    console.log(y);
}
console.log(y)

// --- FUNCTIONS VARIATIONS

// named function
function namedFunction(a,b) {
    // ... instructions
    return;
}

// anonymous function <=> expression functions
let anonymous = function() {
    console.log('this is anonymous');
}

anonymous();

// es6 arrow functions is an anonymous function
// no parameters
const noParams = () => {
    console.log("this is arrow no parameters");
    return;
}
noParams();

//with parameters
const withParameters = (a,b) => {
    return a < b;
}
const resultWithParameters = withParameters(3,4);
console.log(resultWithParameters);

// no curly braces
const noCurly = () => 1 + 1;
const resultCurly = noCurly();
console.log(resultCurly);

// no parenthesis when you have a single parameter
const noParenthesis = a => a + 1;
const resultNoParenthesis = noParenthesis(5);
console.log(resultNoParenthesis);

// Filtering a an array using an arrow function
const array = [2,6,3,1,9,6];
const arrayEven = array.filter(element => element % 2 ? false  : true );
console.log(arrayEven);

// es5 style for the same task of filtering, using an anonymous function
const arrayEvenES5 = array.filter(function(element) {
    return element % 2 ? false  : true;
} );
console.log(arrayEvenES5);


const arrayUneven = array.filter(element => element % 2 );
console.log(arrayUneven);

// to understand better how filter function works on arrays we implemented our own filter function
// filter function is considered an higher order function because it takes as an argument another function
function ourFilter(originalArray, filterFunction) {
    const filteredArray = [];
    for (const element of originalArray) {
        if (filterFunction(element)) {
            console.log('element passed condition', element);
            filteredArray.push(element);
        }
    }

    return filteredArray;
}

function isUneven(element) {
    console.log(element % 2);
    return element % 2;
}

const resultOurUnevenArray = ourFilter(array, isUneven);
console.log(resultOurUnevenArray);

