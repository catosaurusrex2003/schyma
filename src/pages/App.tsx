import React, { useEffect } from 'react'
import { Node, ReactFlowProvider } from 'reactflow'
import Panel from '../components/Panel'
import { useState } from 'react'
import { Flow } from '../components/Flow'
import Ajv from 'ajv'
import { propMerge } from '../utils/reusables'
import { ISchyma } from '../types'

function Schyma({ title, description, schema }: ISchyma) {
  const ajv = new Ajv()
  const [currentNode, setCurrentNode] = useState<Node>()
  const [nNodes, setnNodes] = useState<{ [x: string]: Node }>({})
  const [render, setRender] = useState(false)
  const position = { x: 0, y: 0 }
  const properties = propMerge(schema, '')
  const initialNode: Node = {
    id: '1',
    data: {
      label: title,
      description,
      properties: properties,
      relations: {},
    },
    position,
  }
  const validate = ajv.validateSchema(schema)

  useEffect(() => {
    if (validate) {
      setRender(true)
    }
  }, [validate])
  return (
    <div>
      {render ? (
        <div className='body-wrapper'>
          <div className='node-container'>
            <ReactFlowProvider>
              <Flow
                setnNodes={setnNodes}
                setCurrentNode={setCurrentNode}
                nNodes={nNodes}
                initialNode={initialNode}
                schema={schema}
              />
            </ReactFlowProvider>
          </div>
          <Panel title={title} description={description} node={currentNode} nodes={nNodes} />
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  )
}

export default Schyma
