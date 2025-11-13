import React from 'react'

export default function Banner({ type = 'error', title, message, items = [], onClose, onItemClick }) {
  const bg = type === 'error' ? '#fee2e2' : '#ecfdf5'
  const border = type === 'error' ? '#fecaca' : '#bbf7d0'
  const color = type === 'error' ? '#991b1b' : '#065f46'

  return (
    <div style={{ background: bg, borderTop: `4px solid ${border}`, color, padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <strong style={{ display: 'block' }}>{title}</strong>
        {message && <div style={{ marginTop: 4 }}>{message}</div>}
        {items && items.length > 0 && (
          <div style={{ marginTop: 6, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {items.map(it => (
              <button key={it.id} onClick={() => onItemClick && onItemClick(it)} style={{ background: 'transparent', border: `1px solid ${border}`, padding: '6px 8px', borderRadius: 6, cursor: 'pointer' }}>
                {it.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color }}>Close</button>
      </div>
    </div>
  )
}
