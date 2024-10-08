# Algorithm Visualizer

#### Note:

**This project is my final project for [CS50](https://cs50.harvard.edu/x/2024/) course. Therefore, the code is for reference only and should not be copied by CS50 students since this can violate the academic honesty of the course.**

#### Video Demo: <https://youtu.be/AySwp2FDJQg>

#### Description:

This [React](https://react.dev/) single-page application visualizes some of the popular sorting algorithms by showing the sorting processes with animations. Therefore, it lets the users grasp the time complexity of different sorting algorithms. Currently, the application contains four sorting algorithms which are bubble sort, heap sort, merge sort, and quick sort.

#### How to install and run

To run a React program on your local machine, `npm` (Node package manager) is necessary to install the necessary dependencies. To get npm, you need to install [Node.js](https://nodejs.org/en/download) with which npm is bundled. Therefore, by installing Node.js, npm will be also installed on the system.

If your machine has Node.js of version 14 or higher, you will need to run `npm install` in the terminal after cloning this project. Only after that, you can run this whole program by running `npm start`. It will automatically direct you to your web browser. And finally, you can start interacting with the program. **In the background, you need to keep opening the terminal in which `npm start` was run**

#### How to interact with the program

After starting the project, there will be four inputs that the user can provide which are selecting the sorting method, changing the speed, starting the sorting process, and refreshing the array.

- Selecting the sorting method can be done by clicking on the dropdown menu.
- Changing the speed can be done by moving around the range slider.
- You can start sorting by clicking on the `Start Sorting` button.
- By clicking the `Refresh Array` button, you can reset the array into a new array. It can also be used to stop the sorting process.
- Users can compare the time complexity of each algorithm by looking up the timer which is one of the features in this project.

#### How to wander around the directory

Every implementation of each algorithm can be found in the `algorithms` folder under `src`. Under `src`, `App.js` is the main component of my program's logic and then, it is exported to `index.js` which is the React main component, responsible for rendering. In `App.css`, the main style component of the app, styles specific to `App.js` are implemented.

#### Certain code design choice

- For the timer feature, `ref` is used instead of `state`. The reason for that is related to the re-rendering nature of React. Since `state` can trigger React to re-render, I believe it can be somewhat performance-draining. On the other hand, `ref` does not cause re-rendering. Therefore, this project uses' ref' instead of `state` for certain variables.

- In merge sort implementation, the original implementation used the `slice()` function for dividing the array into left and right parts. Although there was no problem using `slice()`, I noticed it takes `O(n)` time to finish slicing. Therefore, I modified the implementation by handling the merging with the indexes of the original array.

- Quick sort has two common schemes to implement. They are `Lomuto Partition Scheme` and `Hoare Partition Scheme`. In this project, the `Hoare Partition Scheme` is used for `quick sort` since it is slightly faster. In addition, for selecting a pivot, choosing the pivot as the median of the first, middle, and last element instead of the first or last element can avoid performance draining in the worst-case scenario in which the array is almost or completely sorted.

#### What I struggled with during the project

I spent plenty of time on merge sort. The reason I have to struggle with this particular algorithm is because of the asynchronous nature of states in React and the recursive characteristic of Merge sort.

In React, state updates are typically asynchronous. When states are updated, they are not updated immediately. Instead, React updates states in batches to avoid unnecessary re-rendering, performance reasons, etc.

On the other hand, implementing recursive functions with asynchronous code is difficult for me. This becomes more of a problem when a state is depending on its previous state inside a loop. Hence, I have to spend most of my time for merge sort trying to combine the recursive functions and asynchronous nature of React states.
