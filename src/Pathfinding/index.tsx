import { INode, Node } from "./Node";

import "./Pathfinding.css";

const nodes: INode[][] = [];
for (let row = 0; row < 15; row++) {
  const newRow: INode[] = [];

  for (let column = 0; column < 50; column++) {
    const newNode = {
      x: column,
      y: row,
      isStartNode: row === 10 && column === 15,
      isFinishNode: row === 10 && column === 40,
    };

    newRow.push(newNode);
  }

  nodes.push(newRow);
}

console.log(nodes);

export const Pathfinding = () => {
  return (
    <div>
      Pathfinding
      <table>
        <tbody>
          {nodes.map((row) => (
            <tr className="table-row">
              {row.map((node) => (
                <Node {...{ node }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
