export async function bubbleSort(arr, setArr, styling, setStyling, speed, continueSort) {
  let bufferArr = [...arr];
  //non zero swap counter
  let swap = -1;

  //sorted element counter for the program to avoid unnecessary comparison which can affect time complexity
  let numbers_of_sorted = 0;
  await performSort();

  //recursive asynchronous function
  async function performSort() {
    //base case
    if (swap !== 0) {
      swap = 0;
      for (let i = 0; i < bufferArr.length - numbers_of_sorted - 1; i++) {
        if (!continueSort.current) return;

        let bufferStyle = [...styling];
        if (bufferArr[i] > bufferArr[i + 1]) {
          //perform swap
          const buffer = bufferArr[i + 1];

          bufferArr[i + 1] = bufferArr[i];
          bufferArr[i] = buffer;
          bufferStyle[i] = "green";
          bufferStyle[i + 1] = "green";
          //increment swap counter
          swap++;

          //changing color for swapped element
          setStyling([...bufferStyle]);
          //update the array with swapped values
          setArr([...bufferArr]);

          //delaying the program for "speed" millisecond to see the animation
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, speed.current);
          });
        }
      }
      numbers_of_sorted++;

      //highlighting sorted elements which are the largest in this case
      setStyling(
        [...styling],
        (styling[bufferArr.length - numbers_of_sorted] = "green")
      );

      //perform recursion
      await performSort();
    } else {
      //if there is no swap anymore, assume the array is sorted and highlight all
      const buffer_style = [...styling];
      for (let i = 0; i < styling.length; i++) {
        if (!continueSort.current) return;

        //reason for this condition is for the program not to bother with elements which are already green
        if (styling[i] == null) buffer_style[i] = "green";
        else break;
      }
      setStyling([...buffer_style]);
    }
  }
}
