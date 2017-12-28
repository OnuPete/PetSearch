export default function filterBreed(arr, breed) {
  return arr.filter(dog => dog.breed.toLowerCase().includes(breed.toLowerCase()));
}
