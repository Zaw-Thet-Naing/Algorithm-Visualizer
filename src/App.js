import {useRef, useState } from 'react';
import './App.css';
//import all the implemented algorithms
import { bubbleSort } from './algorithms/bubble_sort';
import { mergeSort } from './algorithms/merge_sort';
import { heapSort } from './algorithms/heap_sort';
import { quickSort } from './algorithms/quick_sort';

export default function App() {
  //initialzing an array of 100 elements with values of random number from 0 to 150
  const myArr = Array.from({length: 100}, () => Math.floor(Math.random() * 150));

  //initializing states and refs
  const [method, setMethod] = useState("merge");
  const [arr, setArr] = useState(myArr)
  const [styling, setStyling] = useState(Array(100).fill(null));
  const [isSorting, setIsSorting] = useState(false);
  const speed = useRef(50);
  const seconds = useRef(0);
  const minutes = useRef(0);
  const millisec = useRef(0);
  let timer;

  // since React change the state by batch updating which mean the state changes do not happen immediately.
  // therefore, ref are used instead state to stop the sorting process since `continueSort` state can be old values even if I make changes
  // on the other hand, ref do not possess the nature of batching
  const continueSort = useRef(true);

  //array will refresh with every click
  function handleRefresh() {
    const newArr = Array.from({length: 100}, () => Math.floor(Math.random() * 150));
    setArr([...newArr]);
    setStyling(Array(100).fill(null));
    setIsSorting(false);
    continueSort.current = false;
    minutes.current = 0;
    seconds.current = 0;
    millisec.current = 0;
    clearInterval(timer);
  }

  //method will change with every change of dropdown values
  function handleMethod(event) {
    handleRefresh();
    setMethod(event.target.value);
  }

  //choosing algorithms
  function handleSort() {
    setIsSorting(true);
    continueSort.current = true;
    const sortingFunctions = {
      "merge": mergeSort,
      "quick": quickSort,
      "bubble": bubbleSort,
      "heap": heapSort,
    };
  
    const selectedSort = sortingFunctions[method];
  
    if (selectedSort) selectedSort(arr, setArr, styling, setStyling, speed, continueSort).then(() => clearInterval(timer));
    else return;

    //setting timer
    timer = setInterval(() => {
      if (millisec.current === 9) {
        seconds.current++;
        millisec.current = 0;
      }
      if (seconds.current === 59) {
        minutes.current++;
        seconds.current = 0;
        millisec.current = 0;
      }
      millisec.current++;
    }, 100);
  }

  //speed will be updated with every change in the slider
  function handleSpeed(event) {
    speed.current = event.target.value;
  }

  return (
    <>
      <div className='tabs'>
        <div className='algorithms'>
          <select onChange={handleMethod} name='algorithm'>
            <option value='merge'>Merge sort</option>
            <option value='bubble'>Bubble sort</option>
            <option value='quick'>Quick sort</option>
            <option value='heap'>Heap sort</option>
          </select>
        </div>
        <div className='speed'>
          <label htmlFor='slider'>Speed in milliseconds</label>
          <input id='slider' className='slider' type="range" min="1" max="100" defaultValue ={speed.current} onChange={handleSpeed}/>
        </div>
        <button className='sort' disabled={isSorting} onClick={handleSort}>Start Sorting</button>
        <button className='refresh' onClick={handleRefresh}>Refresh Array</button>
      </div>
      <div className='timer'>
        <h3>Timer</h3>
        <h2>{minutes.current < 10 ? "0" + minutes.current : minutes.current} : {seconds.current < 10 ? "0" + seconds.current : seconds.current} : {millisec.current}</h2>
      </div>
      <div className='visualization'>
        <Visualization arr={arr} styling={styling} />
      </div>
    </>
  )
}

//create bars in the visualizer
function Visualization({arr, styling}) {
  const bars = arr.map((value, index) => {
    return (
      <div key={index} className='bar' style={{height: `calc(${value} * 0.45vh)`, backgroundColor: styling[index]}}>{value}</div>
    )
  });
  
  return (
    <div className='bars'>{bars}</div>
  );
}