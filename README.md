
## Algorithm Visualizer

An interactive web application designed to visually demonstrate the behavior of sorting algorithms through step-by-step animations.
The project focuses on clarity, correctness, and reusability of algorithm logic.


## Overview
This application allows users to generate an array of values and observe how different sorting algorithms manipulate the data over time. Each element is represented as a vertical bar whose height corresponds to its value. Comparisons and updates are animated to provide an intuitive understanding of algorithm execution.

## Features

Visual representation of sorting algorithms

Step-by-step animated execution

Random array generation

Color-based comparison and update highlighting

Modular and reusable algorithm logic

## Technologies

NEXT.JS (Framework)

React (Client Components)

JavaScript (ES6)

Tailwind CSS

DOM-based animation using setTimeout

## Project Structure
src/
├── components/
│   ├── Preview.jsx
│   └── sorts/
│       ├── mergeSort.js
│       └── bubbleSort.js

## Implemented Algorithms
Bubble Sort

A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

Time Complexity: O(n²)

## Getting Started

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

