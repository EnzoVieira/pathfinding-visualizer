import { INode } from "../Node";

const astar = (
  startNode: INode,
  endNode: INode,
  grid: INode[][],
  updateGrid: (e: INode[][]) => void
) => {
  const openSet = [startNode];
  const closeSet: INode[] = [];

  const cameFrom = [{ current: startNode, previous: startNode }];

  myLoop(startNode, endNode, openSet, closeSet, cameFrom, grid, updateGrid);

  return "Não há caminho";
};

const myLoop = (
  startNode: INode,
  endNode: INode,
  openSet: INode[],
  closeSet: INode[],
  cameFrom: { current: INode; previous: INode }[],
  grid: INode[][],
  updateGrid: (e: INode[][]) => void
) => {
  setTimeout(() => {
    openSet.sort((a, b) => {
      return a.cost - b.cost;
    });

    let current = openSet.shift() as INode;
    closeSet.push(current);
    current.visited = true;

    console.log(current, endNode);
    if (current.x === endNode.x && current.y === endNode.y) {
      console.log("Terminou");
      console.log(cameFrom);
      return;
    }

    const neighbors = calculateNeighbors(current, grid, updateGrid);

    neighbors
      .filter(
        (node) =>
          !node.isStartNode && !node.isWallNode && !closeSet.includes(node)
      )
      .forEach((node) => {
        const nodeAlreadyVisited = openSet.includes(node);
        node.inOpenSet = true;

        if (!nodeAlreadyVisited) {
          // openSet.push(node);
          openSet.push(euristic(startNode, endNode, node));
          cameFrom.push({ current, previous: node });
          // console.log(euristic(startNode, endNode, node));
        }
      });

    updateGrid(grid);

    myLoop(startNode, endNode, openSet, closeSet, cameFrom, grid, updateGrid);
  }, 2);
};

export const calculateNeighbors = (
  currentNode: INode,
  grid: INode[][],
  onCallBack: (e: INode[][]) => void
) => {
  const { x, y } = currentNode;

  const neighbors = [];

  if (x < 49) neighbors.push(grid[y][x + 1]);
  if (x > 0) neighbors.push(grid[y][x - 1]);
  if (y > 0) neighbors.push(grid[y - 1][x]);
  if (y < 14) neighbors.push(grid[y + 1][x]);

  if (y > 0 && x < 49) neighbors.push(grid[y - 1][x + 1]);
  if (y < 14 && x < 49) neighbors.push(grid[y + 1][x + 1]);
  if (y > 0 && x > 0) neighbors.push(grid[y - 1][x - 1]);
  if (y < 14 && x > 0) neighbors.push(grid[y + 1][x - 1]);

  const newNodes = [...grid];

  onCallBack(newNodes);

  return neighbors;
};

const euristic = (startNode: INode, endNode: INode, currentNode: INode) => {
  const g =
    Math.abs(endNode.x - currentNode.x) + Math.abs(endNode.y - currentNode.y);
  const h =
    Math.abs(startNode.x - currentNode.x) +
    Math.abs(startNode.y - currentNode.y);

  const f = g + h;

  currentNode.cost = f;

  return currentNode;
};

const reconstructPath = (
  cameFrom: { current: INode; previous: INode }[],
  current: INode
) => {
  const totalPath = [current];

  // while (Object.keys(cameFrom).includes(current)) {}
};

export { astar };
