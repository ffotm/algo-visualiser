# Algorithm Visualizer

An **interactive web application** designed to visually demonstrate the behavior of **sorting algorithms, data structures, and pathfinding algorithms** through **step-by-step animations**.  
The project emphasizes **clarity, correctness, and reusability** while providing a **fun and educational experience** for students and developers alike.

---

## Overview

This application allows users to:

- Generate arrays and graphs with random or custom values  
- Observe how **sorting algorithms, data structures, and pathfinding algorithms** manipulate data over time  
- Interact with an **AI assistant** that explains algorithms step-by-step in beginner-friendly language  
- View **visual animations** that make abstract concepts concrete  

Each element (array or graph node) is represented visually, with **color-coded highlights** for comparisons, swaps, or visited nodes. Animations are designed for clarity and educational value.

---

## Features

- **Visual representation** of sorting, pathfinding, and data structure operations  
- **Step-by-step animated execution**  
- **Random array and graph generation**  
- **Color-coded highlighting** for comparisons, swaps, or traversal  
- **Modular and reusable algorithm logic** for easy addition of new algorithms and structures  
- **AI-powered assistant** for algorithm explanations with Markdown formatting  
- **Scrollable AI output** for long explanations  
- **Frontend chat history** (last 10 questions and answers)  
- **Responsive and interactive UI** built with Tailwind CSS  
- **Animation of tree rotations** (AVL, Red-Black) and heap operations  

---

## Technologies

- **Next.js** – Framework for server-side rendering and API routes  
- **React** – Client-side components and state management  
- **JavaScript (ES6/TypeScript)** – Core logic for algorithms and animations  
- **Tailwind CSS** – Styling and responsive layout  
- **DOM animations** using `setTimeout` and CSS transitions  
- **OpenRouter + OpenAI SDK** – AI-powered algorithm explanations  
- **React Markdown + remark-gfm** – Render AI-generated Markdown  
- **PostgreSQL** (optional, if you plan to store histories or projects in the future)  

---

## Project Structure

app/
├── page.tsx # Main page
├── layout.tsx # Layout and global components
├── globals.css # Global styles
├── navBar.tsx # Navigation bar
├── api/
│ └── ai.ts # AI assistant backend API
├── ui/
│ ├── gradientText.tsx # Reusable gradient text component
│ ├── magicBento.tsx # Decorative UI component
│ └── squares.tsx # Utility/component for visual effects
├── Preview.jsx # Preview animations for arrays/graphs
├── sorts/
│ ├── bubbleSort.js
│ ├── mergeSort.js
│ ├── quickSort.js
│ └── insertionSort.js
├── dataStructures/
│ ├── heap.js
│ ├── bst.js
│ ├── avl.js
│ ├── redBlack.js
│ └── hashTable.js
├── pathfinding/
│ ├── dijkstra.js
│ ├── bfs.js
│ └── dfs.js
├── patterns/
│ └── svgs # Decorative SVG patterns


---

## Implemented Algorithms

### Sorting Algorithms
| Algorithm       | Type                       | Time Complexity | Space Complexity |
|-----------------|----------------------------|----------------|----------------|
| Bubble Sort     | Comparison-based           | O(n²)          | O(1)           |
| Merge Sort      | Divide & Conquer           | O(n log n)     | O(n)           |
| Quick Sort      | Divide & Conquer           | O(n log n) avg | O(log n)       |
| Insertion Sort  | Comparison-based           | O(n²)          | O(1)           |

### Data Structures
| Structure       | Features / Highlights                                       |
|-----------------|-------------------------------------------------------------|
| Binary Search Tree (BST) | Node insert, delete, traversal visualization         |
| AVL Tree        | Balanced tree with rotations visualized                     |
| Red-Black Tree  | Self-balancing with color-coded rotations                  |
| Heap (Min/Max)  | Insert and extract operations visualized                   |
| Hash Table      | Key-value insertion and collisions visualized              |

### Pathfinding Algorithms
| Algorithm       | Type           | Highlights                                      |
|-----------------|----------------|------------------------------------------------|
| Dijkstra        | Weighted Graph | Step-by-step shortest path calculation        |
| BFS             | Graph Traversal| Queue-based exploration of nodes               |
| DFS             | Graph Traversal| Stack-based exploration of nodes               |

---

## AI Assistant Features

The app includes an **AI-powered chat assistant** that:

- Explains algorithms in **beginner-friendly language**  
- Uses **step-by-step explanations**, Markdown formatting, and code blocks  
- Supports **scrollable output** for long explanations  
- Maintains **history of the last 10 questions and answers**  
- Can answer **algorithm-specific questions** or general **computer science concepts**  

**Example prompt behavior:**  
Sup twin, need help? Let's break down the bubble sort algorithm step-by-step...


---

## Getting Started

1. **Clone the repository**  

git clone <repo_url>
cd algorithm-visualizer


2. **Install dependencies**

npm install


4. **Run the development server**

npm run dev

5. **Open your browser at http://localhost:3000**

6. **Interact with the app:**

-Generate a random array or graph

-Select a sorting algorithm, data structure operation, or pathfinding algorithm

-Watch animated execution

-Ask the AI assistant for explanations

## Notes & Future Improvements

-Add more sorting algorithms and data structures

-Implement step-by-step playback controls (pause, forward, backward)

-Enable full AI-guided algorithm walkthroughs with step extraction

-Style code blocks and explanations in the chat for better readability

-Add graphical animations for BFS/DFS/Dijkstra with weighted edges

-Make the app mobile-friendly and fully responsive



