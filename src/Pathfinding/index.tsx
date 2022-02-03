import { useEffect, useState } from "react";
import { INode, Node } from "./Node";

import "./Pathfinding.css";

export const Pathfinding = () => {
  const [nodes, setNodes] = useState<INode[][]>([]);

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
        };

        newRow.push(newNode);
      }

      newNodes.push(newRow);
    }

    setNodes(newNodes);
  }, []);

  const setWallNode = (node: INode) => {
    const newNodes = [...nodes];
    const currentNode = newNodes[node.y][node.x];
    currentNode.isWallNode =
      currentNode.isStartNode || currentNode.isFinishNode ? false : true;

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
                    setWallNode(n);
                    console.log(n);
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
