import "./Node.css";

export interface INode {
  x: number;
  y: number;
  isStartNode: boolean;
  isFinishNode: boolean;
  isWallNode: boolean;
  visited: boolean;
  inOpenSet: boolean;
  isCurrent: boolean;
}

interface IProps {
  node: INode;
  onPressNode?: (node: INode) => void;
}

export const Node = ({ node, onPressNode }: IProps) => {
  const extraClassNode = node.isStartNode
    ? "start-node"
    : node.isFinishNode
    ? "finish-node"
    : "";
  return (
    <td
      className={`node ${extraClassNode} ${
        node.isWallNode ? "wall-node" : ""
      } ${node.inOpenSet ? "to-visit-node" : ""}
      ${node.visited ? "visited-node" : ""}
      ${node.isCurrent ? "current-node" : ""}
      `}
      onClick={() => onPressNode && onPressNode(node)}
    ></td>
  );
};
