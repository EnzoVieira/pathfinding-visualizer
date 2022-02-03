import "./Node.css";

export interface INode {
  x: number;
  y: number;
  isStartNode: boolean;
  isFinishNode: boolean;
  isWallNode: boolean;
}

interface IProps {
  node: INode;
  onPressNode: (node: INode) => void;
}

export const Node = ({ node, onPressNode }: IProps) => {
  const extraClassNode = node.isStartNode
    ? "start-node"
    : node.isFinishNode
    ? "finish-node"
    : "";
  return (
    <td
      className={`node ${extraClassNode} ${node.isWallNode ? "wall-node" : ""}`}
      onClick={() => onPressNode(node)}
    ></td>
  );
};
