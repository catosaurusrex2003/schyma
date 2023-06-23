import React, { useEffect, useState } from "react";
import CodeComponent from "./Code";
import { Node } from 'reactflow';
import Tables from "./Tables";

type Props = {
  node: Node | undefined,
  nodes: Node[] | undefined,
}

function Panel({ node, nodes}: Props) {
  const [view, setView] = useState<Node>();
  const [activeLabel, setActiveLabel] = useState("");
  useEffect(() => {
    if (node?.data && node.data?.children.length > 0) {
      setView(node);
    } else {
      // whenever this condition is true, update the node to the parent node
      // any current node
      if (nodes) {
        const findParent = nodes.filter(
          (item: {id: any}) => item?.id == node?.data?.parent
        );
        setView(findParent[0]);
      }
      if (activeLabel !== node?.data?.label) {
        setActiveLabel(node?.data?.label);3
      }
    }
  }, [node]);

  if (view && Object.keys(view).length > 0) {
    const nodeData = view.data;
    return (
      <div className="panel">
        <h1 className="my-4 text-[25px] text-[#F1F5F9]">
          {nodeData.title || nodeData.label}
        </h1>
        <p className="mt-6 text-[#94A3B8]">{nodeData.description}</p>
        
        <Tables nodes={nodeData.children} active={node} />
        
        {nodeData.examples && <div className="mt-10">
          <h1 className="my-4 text-[20px] text-[#F1F5F9]">
            Examples
          </h1>
          {nodeData.examples.map((example: any) => <CodeComponent key={example.title}>{JSON.stringify(example, null, 2)}</CodeComponent>)}
        </div> }

      </div>
    );
  }
  return (
    <div className="side-bar relative">
      <div className="p-6">
        <h1 className="text-[25px] font-bold text-[#F1F5F9]">AsyncAPI Spec Visualizer</h1>
        <p className="mt-6 text-[#94A3B8]">
          The AsyncAPI specification visualizer helps you learn and navigate the
          different components that makes up the AsyncAPI specification in an
          interactive way.
        </p>
      </div>
    </div>
  );
}

export default Panel;
