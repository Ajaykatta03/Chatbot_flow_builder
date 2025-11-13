import React, { useState } from 'react'
import { useFlowState, useFlowDispatch } from '../../state/flowContext'
import { validateBeforeSave } from '../../utils/validators'
import { exportFlow } from '../../utils/export'
import Banner from '../UI/Banner'

export default function TopBar() {
  const state = useFlowState()
  const dispatch = useFlowDispatch()
  const [banner, setBanner] = useState(null)

  function clearInvalidMarkers() {
    state.nodes.forEach(n => {
      if (n.data && n.data.__invalid) {
        dispatch({ type: 'UPDATE_NODE', id: n.id, data: { __invalid: false } })
      }
    })
  }

  function onSave() {
    // clear previous invalid markers
    clearInvalidMarkers()

    const res = validateBeforeSave(state.nodes, state.edges)
    if (!res.ok) {
      // mark offending nodes with data.__invalid = true so canvas can highlight them
      res.nodes.forEach(n => {
        dispatch({ type: 'UPDATE_NODE', id: n.id, data: { __invalid: true } })
      })
      // show an error banner with clickable offending nodes
      setBanner({
        type: 'error',
        title: 'Cannot save Flow',
        message: 'More than one node has empty target handles',
        items: res.nodes,
      })
      return
    }

    const payload = exportFlow(state.nodes, state.edges)
    // trigger download
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'flow.json'
    a.click()
    URL.revokeObjectURL(url)
    // small success banner briefly
    setBanner({ type: 'success', title: 'Flow exported', message: 'Your flow JSON has been downloaded.' })
    setTimeout(() => setBanner(null), 2500)
  }

  return (
    <div>
      {/* Show error banner normally */}
      {banner && banner.type === 'error' && (
        <Banner
          type={banner.type}
          title={banner.title}
          message={banner.message}
          items={banner.items}
          onClose={() => setBanner(null)}
          onItemClick={item => {
            dispatch({ type: 'SET_SELECTED', id: item.id })
            setBanner(null)
          }}
        />
      )}
      {/* Show success banner inside Bootstrap modal */}
      {banner && banner.type === 'success' && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <Banner
                  type={banner.type}
                  title={banner.title}
                  message={banner.message}
                  onClose={() => setBanner(null)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <header className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <strong>Bitespeed Flow</strong>
        </div>
        <div>
          <button className="btn btn-outline-info" onClick={onSave}>
            Save Changes
          </button>
        </div>
      </header>
    </div>
  )
}
