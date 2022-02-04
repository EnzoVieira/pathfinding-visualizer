import { INode } from "../Node";

const astar = (
  startNode: INode,
  endNode: INode,
  grid: INode[][],
  updateGrid: (e: INode[][]) => void,
  setNode: (node: INode, key: "isWallNode" | "isStep", value: any) => void
) => {
  const openSet = [startNode];
  const closeSet: INode[] = [];

  const cameFrom = [{ current: startNode, previous: startNode }];

  myLoop(
    startNode,
    endNode,
    openSet,
    closeSet,
    cameFrom,
    grid,
    updateGrid,
    setNode
  );

  return "Não há caminho";
};

const myLoop = (
  startNode: INode,
  endNode: INode,
  openSet: INode[],
  closeSet: INode[],
  cameFrom: { current: INode; previous: INode }[],
  grid: INode[][],
  updateGrid: (e: INode[][]) => void,
  setNode: (node: INode, key: "isWallNode" | "isStep", value: any) => void
) => {
  setTimeout(() => {
    openSet.sort((a, b) => {
      return a.cost - b.cost;
    });

    let current = openSet.shift() as INode;
    closeSet.push(current);
    current.visited = !current.isFinishNode;

    if (current.x === endNode.x && current.y === endNode.y) {
      const path = reconstructPath(cameFrom, current);

      path.forEach((step, index) => {
        setTimeout(() => {
          setNode(grid[step.y][step.x], "isStep", true);
        }, 50 * index);
      });

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
        node.inOpenSet = !node.isFinishNode;

        if (!nodeAlreadyVisited) {
          openSet.push(euristic(startNode, endNode, node));
          cameFrom.push({ current: node, previous: current });
        }
      });

    updateGrid(grid);

    myLoop(
      startNode,
      endNode,
      openSet,
      closeSet,
      cameFrom,
      grid,
      updateGrid,
      setNode
    );
  }, 10);
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
  const xDistanceToEnd = endNode.x - currentNode.x;
  const yDistanceToEnd = endNode.y - currentNode.y;

  const xDistanceToStart = startNode.x - currentNode.x;
  const yDistanceToStart = startNode.y - currentNode.y;

  const distanceToEnd = Math.sqrt(xDistanceToEnd ** 2 + yDistanceToEnd ** 2);
  const distanceToStart = Math.sqrt(
    xDistanceToStart ** 2 + yDistanceToStart ** 2
  );

  currentNode.cost = distanceToEnd + distanceToStart;

  return currentNode;
};

const reconstructPath = (
  cameFrom: { current: INode; previous: INode }[],
  current: INode
) => {
  const totalPath = [current];

  let relation = cameFrom.find((n) => n.current === current);

  while (relation?.current !== relation?.previous) {
    if (relation?.previous) totalPath.push(relation?.previous);

    relation = cameFrom.find((n) => n.current === relation?.previous);
  }

  return totalPath;
};

export { astar };
