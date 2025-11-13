import React from 'react'
import { useFlowState, useFlowDispatch } from '../../state/flowContext'

export default function SettingsPanel() {
  const { nodes, selectedNodeId } = useFlowState()
  const dispatch = useFlowDispatch()
  const node = nodes.find(n => n.id === selectedNodeId)
  if (!node) return <div>No node selected</div>

  function onTextChange(e) {
    // update node text and clear invalid marker for this node if present
    dispatch({ type: 'UPDATE_NODE', id: node.id, data: { text: e.target.value, __invalid: false } })
  }

  return (
    <div>
      <h4>Message</h4>
      <div className="settings-row">
        <div>ID: {node.id}</div>
      </div>
      <div className="settings-row">
        <label>Text</label>
        <textarea className="text-area" value={node.data?.text || ''} onChange={onTextChange} />
      </div>
    </div>
  )
}
