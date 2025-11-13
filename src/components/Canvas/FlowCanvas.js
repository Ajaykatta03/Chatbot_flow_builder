import React, { useCallback, useRef } from 'react'
import ReactFlow, { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow'
import 'reactflow/dist/style.css'
import { nanoid } from 'nanoid'
import { getDefaultNode } from '../../utils/nodeSchemas'
import TextNode from './nodes/TextNode'
import { useFlowState, useFlowDispatch } from '../../state/flowContext'

const nodeTypes = { textNode: TextNode }

export default function FlowCanvas() {
  const { nodes, edges } = useFlowState()
  const dispatch = useFlowDispatch()
  const reactFlowWrapper = useRef(null)
  const reactFlowInstance = useRef(null)

  // Directly update context on node/edge changes
  const onNodesChange = useCallback(
    changes => {
      dispatch({ type: 'LOAD_FLOW', nodes: applyNodeChanges(changes, nodes), edges })
    },
    [dispatch, nodes, edges],
  )

  const onEdgesChange = useCallback(
    changes => {
      dispatch({ type: 'LOAD_FLOW', nodes, edges: applyEdgeChanges(changes, edges) })
    },
    [dispatch, nodes, edges],
  )

  const onConnect = useCallback(
    params => {
      // enforce single outbound per source handle
      const exists = edges.some(e => e.source === params.source && e.sourceHandle === params.sourceHandle)
      if (exists) {
        alert('Each source handle may only have one outbound connection')
        return
      }
      const newEdge = addEdge({ ...params, id: 'e' + nanoid() }, edges)
      dispatch({ type: 'LOAD_FLOW', nodes, edges: newEdge })
    },
    [edges, nodes, dispatch],
  )

  const onNodeClick = useCallback((event, node) => {
    dispatch({ type: 'SET_SELECTED', id: node.id })
  }, [dispatch])

  const onDrop = useCallback(
    event => {
      event.preventDefault()
      const reactFlowType = event.dataTransfer.getData('application/reactflow')
      if (!reactFlowType) return
      const bounds = reactFlowWrapper.current?.getBoundingClientRect() || { left: 0, top: 0 }
      const point = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
      let nodePosition = point
      if (reactFlowInstance?.current && typeof reactFlowInstance.current.project === 'function') {
        nodePosition = reactFlowInstance.current.project(point)
      }
      if (!nodePosition || isNaN(Number(nodePosition.x)) || isNaN(Number(nodePosition.y))) {
        nodePosition = { x: 200, y: 100 }
      }
      const id = nanoid()
      const newNode = getDefaultNode(reactFlowType, id, nodePosition)
      dispatch({ type: 'LOAD_FLOW', nodes: [...nodes, newNode], edges })
    },
    [nodes, edges, dispatch],
  )

  const onDragOver = useCallback(event => event.preventDefault(), [])

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onInit={instance => (reactFlowInstance.current = instance)}
        fitView
      />
    </div>
  )
}
