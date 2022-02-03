import { useEffect, useState } from "react";
import { astar, calculateNeighbors } from "./Algorithms/astar";
import { INode, Node } from "./Node";

import "./Pathfinding.css";

export const Pathfinding = () => {
  const [nodes, setNodes] = useState<INode[][]>([]);
  const [action, setAction] = useState<"setWallNode" | "calcNeighbors">(
    "setWallNode"
  );

  const startNode = {
    x: 15,
    y: 10,
    isStartNode: true,
    isFinishNode: false,
    isWallNode: false,
    visited: true,
    inOpenSet: true,
    isCurrent: false,
  };
  const endNode = {
    x: 40,
    y: 10,
    isStartNode: false,
    isFinishNode: true,
    isWallNode: false,
    visited: false,
    inOpenSet: false,
    isCurrent: false,
  };

  useEffect(() => {
    const newNodes: INode[][] = [];
    for (let row = 0; row < 15; row++) {
      const newRow: INode[] = [];

      for (let column = 0; column < 50; column++) {
        const newNode = {
          x: column,
          y: row,
          isStartNode: row === 10 && column === 15,
          isFinishNode: row === 10 && column === 40,
          isWallNode: false,
          visited: false,
          inOpenSet: false,
          isCurrent: false,
        };

        newRow.push(newNode);
      }

      newNodes.push(newRow);
    }

    setNodes(newNodes);
  }, []);

  const setNode = (node: INode, key: "isWallNode", value: any) => {
    const newNodes = [...nodes];
    const currentNode = newNodes[node.y][node.x];
    currentNode[key] =
      !(currentNode.isStartNode || currentNode.isFinishNode) && value;

    setNodes(newNodes);
  };

  return (
    <div>
      Pathfinding
      <table>
        <tbody>
          {nodes.map((row, i) => (
            <tr key={i} className="table-row">
              {row.map((node) => (
                <Node
                  key={`${node.x},${node.y}`}
                  {...{ node }}
                  onPressNode={(n) => {
                    if (action === "setWallNode") {
                      setNode(n, "isWallNode", true);
                    } else {
                      calculateNeighbors(n, nodes, setNodes);
                    }
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() =>
          action === "setWallNode"
            ? setAction("calcNeighbors")
            : setAction("setWallNode")
        }
      >
        Alterar
      </button>
      <button onClick={() => astar(startNode, endNode, nodes, setNodes)}>
        Começar
      </button>
    </div>
  );
};
