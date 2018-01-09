export default function filterBreed(arr, breed) {
  if (arr.length === 0) return arr;
  return arr.filter(dog => dog.breed.toLowerCase().includes(breed.toLowerCase()));
}
