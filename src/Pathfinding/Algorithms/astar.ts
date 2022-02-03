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

  console.log(endNode);
  myLoop(endNode, openSet, closeSet, grid, updateGrid);

  return "Não há caminho";
};

const myLoop = (
  endNode: INode,
  openSet: INode[],
  closeSet: INode[],
  grid: INode[][],
  updateGrid: (e: INode[][]) => void
) => {
  setTimeout(() => {
    let current = openSet.shift() as INode;
    closeSet.push(current);
    current.visited = true;

    if (current.x === endNode.x && current.y === endNode.y) {
      console.log("Terminou");
      return;
    }

    const neighbors = calculateNeighbors(current, grid, updateGrid);

    neighbors
      .filter(
        (node) =>
          !node.isStartNode &&
          !node.isFinishNode &&
          !node.isWallNode &&
          !closeSet.includes(node)
      )
      .forEach((node) => {
        const nodeAlreadyVisited = openSet.includes(node);
        node.inOpenSet = true;

        if (!nodeAlreadyVisited) {
          openSet.push(node);
        }
      });

    updateGrid(grid);

    myLoop(endNode, openSet, closeSet, grid, updateGrid);
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

  // neighbors.forEach((node) => {
  //   node.inOpenSet =
  //     !node.isStartNode && !node.isFinishNode && !node.isWallNode;
  // });

  const newNodes = [...grid];

  onCallBack(newNodes);

  return neighbors;
};

export { astar };
