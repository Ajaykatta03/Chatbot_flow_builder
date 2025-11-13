import React from 'react'
import { nodeSchemas } from '../../utils/nodeSchemas'

function NodeItem({ schema }) {
  function onDragStart(e) {
    e.dataTransfer.setData('application/reactflow', schema.type)
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="node-item" draggable onDragStart={onDragStart}>
      <div className="label">{schema.title}</div>
    </div>
  )
}

export default function NodesPanel() {
  return (
    <div>
      <h4>Nodes</h4>
      <div className="nodes-list">
        {nodeSchemas.map(s => (
          <NodeItem key={s.type} schema={s} />
        ))}
      </div>
    </div>
  )
}
