# Pathfinding Visualizer

This is a pathfinding visualizer project built with React to practice the A* algorithm. It allows you to see how the A* algorithm finds the shortest path between two points on a grid.

## Demo

https://user-images.githubusercontent.com/73349819/229625490-906442d4-0742-4701-8e91-abbedac08dd6.mp4

## Features

- [x] Visualize the A\* algorithm in action
- [ ] Choose the start and end points on the grid
- [x] Add obstacles to the grid
- [ ] Choose between different heuristics for the A\* algorithm
- [ ] Responsive design

## Technologies Used

- React
- HTML
- CSS

## Getting Started

To get started with this project, you can clone the repository and install the dependencies:

```sh
git clone https://github.com/EnzoVieira/pathfinding-visualizer.git
cd pathfinding-visualizer
npm install
```

You can then start the development server:

```sh
npm run start
```

## Usage

1. Add obstacles to the grid by clicking on a square to make it a wall
2. Click the "Visualize" button to see the A\* algorithm in action
3. Watch as the algorithm finds the shortest path between the start and end points.
4. The squares in orange is the places that the algorithm already visited, the blue ones are to be visit, and the purple ones are the path that were found.
