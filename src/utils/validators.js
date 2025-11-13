export function validateBeforeSave(nodes, edges) {
  // nodes: array of node objects {id, data}
  // edges: array of edge objects {id, source, target}
  if (!nodes || nodes.length <= 1) return { ok: true }

  const inboundCount = {}
  nodes.forEach(n => (inboundCount[n.id] = 0))
  edges.forEach(e => {
    if (e.target && inboundCount[e.target] !== undefined) inboundCount[e.target]++
  })

  const emptyTargetNodes = nodes.filter(n => inboundCount[n.id] === 0)

  if (emptyTargetNodes.length > 1) {
    return {
      ok: false,
      reason: 'multiple_empty_targets',
      nodes: emptyTargetNodes.map(n => ({ id: n.id, label: n.data?.label || n.data?.text || n.id })),
    }
  }

  return { ok: true }
}
