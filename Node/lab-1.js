// Part 1:
const name = "Zack";
let age = 25;
age += 1;
console.log(name, age);

// Part 2:
// Regular function
add(1,2)
function add(x, y) {
  return x + y;
}

// Pure function
const add2 = (x, y) => {
  return x + y;
}
add2(1,2)

// Anonymous function
const add3 = function(x, y) {
  return x + y;
}
add3(2,3)

console.log(add2(5, 6))

// Hello functions
const hello = (name) => {
  return "Hello " + name
}
// Implicit return
const hello2 = (name) => (
  "Hello " + name
)
console.log(hello("Everyone!"))

// isEven the long way
const isEven = (number) => {
  if(number % 2 == 0) {
    return true;
  } else {
    return false;
  }
}
// isEven the shorter way
const isEvenShort = (number) => {
  return number % 2 == 0
}
// isEvent the shortest way
const isEvenShortest = (n) => n % 2 === 0

// Part 3
const animals = ['dog', 'cat', 'llama', 'bird'];
// Solutions:
// for(let i = 0; i < animals.length; i++)
// for(const animal of animals) 
animals.forEach((animal) => {
  console.log(animal.toUpperCase())
})

// Remove cat from the array
const catIndex = animals.indexOf("cat");
animals.splice(catIndex, 1);

animals.push("opossum")
console.log(animals)
console.log(animals.pop())
console.log(animals)

// Part 4

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  distance(otherPoint) {
    const a = this.x - otherPoint.x;
    const b = this.y - otherPoint.y;

    return Math.sqrt(a*a + b*b);
  }
}

const p1 = new Point(1, 2);
const p2 = new Point(10, 5);

console.log(p1.distance(p2))

console.log(p1.distance("Haha"))