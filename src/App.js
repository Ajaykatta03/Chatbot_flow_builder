import React from 'react'
import { FlowProvider } from './state/flowContext'
import TopBar from './components/TopBar/TopBar'
import SidePanel from './components/SidePanel/SidePanel'
import FlowCanvas from './components/Canvas/FlowCanvas'

export default function App() {
  // Layout: TopBar (Save button top right), Canvas left, NodesPanel right
  return (
    <FlowProvider>
      <div className="app-root">
        <TopBar />
        <div className="app-body" style={{ display: 'flex', height: '100%' }}>
          <main className="canvas-area" style={{ flex: 1, minWidth: 0 }}>
            <FlowCanvas />
          </main>
          <aside className="right-panel" style={{ width: 320, background: '#f8fafb', borderLeft: '1px solid #eee', padding: 12 }}>
            <SidePanel rightPanelOnly />
          </aside>
        </div>
      </div>
    </FlowProvider>
  )
}
