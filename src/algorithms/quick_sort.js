export async function quickSort(arr, setArr, styling, setStyling, speed, continueSort) {
    let buffer_arr = [...arr];
    await performSort(0, buffer_arr.length - 1);

    // select a pivot and partition left and right side of pivot according to left side is smaller than pivot and right side is larger
    async function partition(start, middle, end) {
        // select pivot
        let pivot = medianOfThree(buffer_arr[start], buffer_arr[middle], buffer_arr[end]);

        // getting the pivot out of the way to the end of array
        const temp = pivot;
        [pivot, buffer_arr[end]] = [buffer_arr[end], temp];
        
        // left and right are pointer for iterating through array
        // itemFromLeft and itemFromRight are buffer for elements that are lesser or greater that pivot
        let left = start, right = end - 1, itemFromLeft = -1, itemFromRight = -1;
        while (left <= right) {
            if (!continueSort.current) return;

            // highligting the left and right elements from sub arrays
            let buffer_style = [...styling];
            buffer_style[left] = buffer_style[right] = "green";
            buffer_style[end] = "red";
            setStyling([...buffer_style]);

            if (buffer_arr[left] >= buffer_arr[end]) itemFromLeft = left;
            else left++;

            if (buffer_arr[right] <= buffer_arr[end]) itemFromRight = right;
            else right--;

            // if we have both item from left which is greater than pivot and item from right which is lesser, swap them and continue the loop
            if (itemFromLeft > -1 && itemFromRight > -1) {
                const temp = buffer_arr[itemFromLeft];
                buffer_arr[itemFromLeft] = buffer_arr[itemFromRight];
                buffer_arr[itemFromRight] = temp;
                itemFromLeft = itemFromRight = -1;
                left++;
                right--;
                setArr([...buffer_arr]);
            }
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, speed.current);
            })
        }

        // since we get pivot out of the way to the end, we need to get our pivot back to its original place
        [buffer_arr[end], buffer_arr[left]] = [buffer_arr[left], temp];
        setArr([...buffer_arr]);

        // return the pivot index
        return left;
    }

    async function performSort(start, end) {
        if (start < end) {
            const middle = Math.floor((start + end) / 2);
            const pivotIndex = await partition(start, middle, end);

            // recurisvly start partitioning again for the sub arrays divided by pivot
            await performSort(start, pivotIndex - 1);
            if (!continueSort.current) return;

            await performSort(pivotIndex + 1, end);
            if (!continueSort.current) return;

            // highlight every element after finish sorting
            setStyling(Array(100).fill("green"));
        }
    }

    // select the median of three values as pivot
    function medianOfThree(a, b, c) {
        if ((a >= b && b >= c) || (c >= b && b >= a)) {
            return b;
        } else if ((a >= c && c >= b) || (b >= c && c >= a)) {
            return c;
        } else {
            return a;
        }
    }
}