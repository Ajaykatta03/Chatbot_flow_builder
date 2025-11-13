import React from 'react'
import { useFlowState } from '../../state/flowContext'
import NodesPanel from './NodesPanel'
import SettingsPanel from './SettingsPanel'

export default function SidePanel({ rightPanelOnly }) {
  const { selectedNodeId } = useFlowState()

  // Always show SettingsPanel if a node is selected (right panel UX)
  if (selectedNodeId) {
    return <SettingsPanel />
  }
  // Otherwise, show NodesPanel
  return <NodesPanel />
}
