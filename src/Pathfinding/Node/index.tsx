import "./Node.css";

export interface INode {
  x: number;
  y: number;
  isStartNode: boolean;
  isFinishNode: boolean;
}

interface IProps {
  node: INode;
}

export const Node = ({ node }: IProps) => {
  const extraClassNode = node.isStartNode
    ? "start-node"
    : node.isFinishNode
    ? "finish-node"
    : "";
  return <div className={`node ${extraClassNode}`}></div>;
};
