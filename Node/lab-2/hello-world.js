const capitalizeWord = (string) => {
  return string[0].toUpperCase() + string.slice(1)
} 

const capitalize = (string) => (
  // const words = string.split(" ");
  // const capitolWords = words.map(capitalizeWord);
  // return capitolWords.join(" ");

  string
    .split(" ")
    .map(capitalizeWord)
    .join(" ")
)

const speak = (name) => {
  return `Hello there! You are ${capitalize(name)}!!!`
}

module.exports = {
  speak,
  capitalize
}