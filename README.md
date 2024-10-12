# Algorithm Visualizer

#### Note:

**This project is my final project for [CS50](https://cs50.harvard.edu/x/2024/) course. Therefore, the code is for reference only and should not be copied by CS50 students since this can violate the academic honesty of the course.**

#### Video Demo: <https://youtu.be/AySwp2FDJQg>

#### Description:

  This [React](https://react.dev/) single-page application visualizes some of the popular sorting algorithms by showing the sorting processes with animations. Currently, the application contains four sorting algorithms which are bubble sort, heap sort, merge sort, and quick sort.
  I built this program because I've never coded any sorting algorithm, and I thought that in this way, I can improve my problem solving and debugging skills.

#### How to install and run

##### - Install `npm` (Node Package Manager)
To get npm, you need to install [Node.js](https://nodejs.org/en/download) with which npm is bundled. Therefore, by installing Node.js, npm will be also installed on the system.

##### - If Node.js is already on the machine
If your machine has Node.js of version 14 or higher, you will need to run `npm install` in the terminal after cloning this project.

##### - Run the project
Initiate this program by running `npm start`. **In the background, you need to keep opening the terminal in which `npm start` was run**

#### How to interact with the program

After starting the project, users can select the sorting methods, change the speed, start the sorting process, and refresh the array.

- Selecting the sorting method can be done by clicking on the dropdown menu.
- Changing the speed can be done by moving around the range slider.
- You can start sorting by clicking on the `Start Sorting` button.
- By clicking the `Refresh Array` button, you can reset the array into a new array. It can also be used to stop the sorting process.
- Users can compare the time complexity of each algorithm by looking up the timer which is one of the features in this project.

#### Certain code design choice

- For the timer feature, `ref` is used instead of `state` to avoid re-rendering nature of React which can have effect on performance.

- In merge sort implementation, originally used `slice()` function for dividing the array into left and right parts is excluded in the final version since it takes `O(n)` time to finish slicing. Therefore, I modified the implementation by handling the merging with the indexes of the original array.

- In quick sort, for choosing a pivot, the median of the first, middle, and last element is used instead of the first or last element. It is to tackle algorithm's worst-case scenario in which the array is almost or completely sorted.

#### What I struggled with during the project

- Merge sort took a significant amount of time in this project since I were to combine the asynchronous nature of React's states and the recursive characteristic of Merge sort together. For instance, it was the time when a state is depending on its previous state inside a loop in my merge sort implementation.
