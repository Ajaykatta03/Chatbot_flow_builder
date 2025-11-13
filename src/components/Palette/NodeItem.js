import React from 'react'

export default function NodeItem({ icon, label }) {
  return (
    <div className="node-item">
      <div>{icon}</div>
      <div className="label">{label}</div>
    </div>
  )
}
