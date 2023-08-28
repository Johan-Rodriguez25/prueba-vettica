import { BubbleSort } from "./ejercicio1/ejercicio1";
import { FizzBuzz } from "./ejercicio2/ejercicio2";

// Ejercicio 1 - BubbleSort
const arrDesordenado: number[] = [3, 2, 1, 8, 5];
const arrOrdenado: number[] = BubbleSort.sort(arrDesordenado);
console.log(arrOrdenado);

// Ejercicio 2 - FizzBuzz
console.log(FizzBuzz.evaluate(20));
