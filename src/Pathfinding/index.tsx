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
    cost: 0,
    x: 0,
    y: 0,
    isStartNode: true,
    isFinishNode: false,
    isWallNode: false,
    visited: true,
    inOpenSet: true,
    isStep: false,
  };
  const endNode = {
    cost: 0,
    x: 49,
    y: 14,
    isStartNode: false,
    isFinishNode: true,
    isWallNode: false,
    visited: false,
    inOpenSet: false,
    isStep: false,
  };

  useEffect(() => {
    const newNodes: INode[][] = [];
    for (let row = 0; row < 15; row++) {
      const newRow: INode[] = [];

      for (let column = 0; column < 50; column++) {
        const newNode = {
          cost: 0,
          x: column,
          y: row,
          isStartNode: row === startNode.y && column === startNode.x,
          isFinishNode: row === endNode.y && column === endNode.x,
          isWallNode: false,
          visited: false,
          inOpenSet: false,
          isStep: false,
        };

        newRow.push(newNode);
      }

      newNodes.push(newRow);
    }

    setNodes(newNodes);
  }, []);

  const setNode = (node: INode, key: "isWallNode" | "isStep", value: any) => {
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
      <button
        onClick={() => astar(startNode, endNode, nodes, setNodes, setNode)}
      >
        Começar
      </button>
    </div>
  );
};
