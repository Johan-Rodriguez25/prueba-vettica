export class BubbleSort {
  static sort(arr: number[]): number[] {
    const len: number = arr.length;
    let swapped: boolean = true;

    for (let i = 0; i < len - 1 && swapped; i++) {
      swapped = false;
      for (let j = 0; j < len - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp: number = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true;
        }
      }
    }

    return arr;
  }
}
