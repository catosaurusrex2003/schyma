import { Node } from 'reactflow'
import { create } from 'zustand'

interface FlowState {
  currentNode?: Node
  setCurrentNode: (node?: Node) => void
  nNodes: { [x: string]: Node }
  setnNodes: (nodes: { [x: string]: Node }) => void
}

const useFlowState = create<FlowState>((set) => ({
  currentNode: undefined,
  setCurrentNode: (node) => set({ currentNode: node }),
  nNodes: {},
  setnNodes: (nodes) => set({ nNodes: nodes }),
}))

export default useFlowState
