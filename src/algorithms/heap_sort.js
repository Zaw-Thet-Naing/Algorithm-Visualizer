export async function heapSort(arr, setArr, styling, setStyling, speed, continueSort) {
    //tracking number of sorted elements
    let number_of_sorted = 0;

    let buffer_arr = [...arr];
    let buffer_style = [...styling];

    await performSort();

    //heapify is responsible for making sure the tree maintains the structure of heap after some part of the array is already sorted.
    //since heapify doesn't check the tree node by node, it doesn't guarantee the whole max heap structure
    //especially when the array is completely unordered
    async function heapify(i, len) {
        if (!continueSort.current) return;

        let largest = i;
        //creating tree with left and right children of parent 'i'
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        //if one of the children is larger than parent, 'largest' will be that child's index
        if (left < len && buffer_arr[left] > buffer_arr[largest]) largest = left;
    
        if (right < len && buffer_arr[right] > buffer_arr[largest]) largest = right;

        //swapping only happen when the child is larger
        //this is also the base case
        if (largest !== i) {
            //swap the larger child with parent
            const temp = buffer_arr[i];
            buffer_arr[i] = buffer_arr[largest];
            buffer_arr[largest] = temp;

            setStyling(prev => {
                let buffer_style = [...prev];
                buffer_style[i] = "green";
                buffer_style[largest] = "green";
                return buffer_style;
            });
            setArr([...buffer_arr]);

            //delay 'speed' millisecond
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, speed.current);
            });

            //continue heapify with the index of swapped child
            await heapify(largest, len);
        }
    }

    //buildMaxHeap is responsible for making sure the whole tree maintains the structure of heap which is that all parent node is larger than their children nodes
    //it works by checking node by node, starting from the middle
    async function buildMaxHeap() {
        for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
            if (!continueSort.current) return;
            await heapify(i, arr.length);
        }
    }

    async function performSort() {
        //starting by forming the whole array into legit max heap structure
        await buildMaxHeap();
        //swapping the root and the last element of heap (not array) after max heap
        while (buffer_arr.length - 1 !== number_of_sorted) {
            if (!continueSort.current) return;

            const unsorted_len = buffer_arr.length - number_of_sorted;
            const temp = buffer_arr[unsorted_len - 1];
            buffer_arr[unsorted_len - 1] = buffer_arr[0];
            buffer_arr[0] = temp;

            number_of_sorted++;
            setArr([...buffer_arr]);
            
            // highligthing the sorted element
            buffer_style[unsorted_len - 1] = "green"
            setStyling([...buffer_style]);
            //since the swapping can violate the heap structure, heapify have to call again from the root element again
            await heapify(0, unsorted_len - 1);
        }
    }
}