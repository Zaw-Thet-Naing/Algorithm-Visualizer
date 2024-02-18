export async function mergeSort(arr, setArr, styling, setStyling, speed, continueSort) {
    await performSort(0, arr.length - 1);

    //handle merging after splitting the array into halves
    async function performMerge(start, middle, end) {
        let buffer_style = [...styling];
        //buffer array for merged halves
        let merged = [];

        for (let i = start, j = 0; i < end + 1; i++, j++) {
            if (!continueSort.current) return;

            //highlighting elements from each of two halves
            buffer_style[i] = "green";
            buffer_style[middle + j] = i <= middle ? "green" : null;
            setStyling([...buffer_style]);

            //the program will show warning message if i uncomment the following line 
            //since react is warning me about the program is passing "merged" (arrays and objects are pointers in javascript) by reference to setArr
            //which might potentially lead to unexcepted behavior

            // eslint-disable-next-line no-loop-func
            setArr(prev => {                    //functional form of useState hook makes sure that 
                let buffer_arr = [...prev];     //only previous array is being used in the function instead of other old values

                //making sure merging happen only once in each recursion
                if (i === start) {
                    let left_len = (middle + 1) - start;
                    let right_len = end - middle;

                    //remove the lesser element from either of left or right part and push it to "merged"
                    let left_index = start, right_index = middle + 1;
                    while (left_len > 0 && right_len > 0) {
                        if (buffer_arr[left_index] > buffer_arr[right_index]) {
                            merged.push(buffer_arr[right_index]);
                            right_index++;
                            right_len--;
                        } else {
                            merged.push(buffer_arr[left_index]);
                            left_index++;
                            left_len--;
                        }
                    }

                    //push the remaning element which will be the largest of two halves to "merged"
                    merged = merged.concat(buffer_arr.slice(left_index, middle + 1), buffer_arr.slice(right_index, end + 1));
                }

                //change the elements of original array from "start" to "end" with "merged"
                buffer_arr[i] = merged[j];
                return buffer_arr;
            });

            //delaying the program for "speed" millisecond to see the animation
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, speed.current);
            });
        }
    }

    async function performSort(start, end) {
        //reason for writing the code with indexs like start and end is that
        //to know which part of array are being splitted and merged so that
        //animation of merging process can be seen instead of immediate merged state
        if (start < end && continueSort.current) {
            const middle = Math.floor((start + end) / 2);
    
            //handling the left part of array from start
            await performSort(start, middle);
            if (!continueSort.current) return;
            //handling the right part of arrat from middle
            await performSort(middle + 1, end);
            if (!continueSort.current) return;

            await performMerge(start, middle, end);   
        }
    }
}