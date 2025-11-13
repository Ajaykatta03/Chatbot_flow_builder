export const initialState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
}

export function flowReducer(state, action) {
  switch (action.type) {
    case 'ADD_NODE':
      return { ...state, nodes: [...state.nodes, action.node] }
    case 'UPDATE_NODE':
      return {
        ...state,
        nodes: state.nodes.map(n => (n.id === action.id ? { ...n, data: { ...n.data, ...action.data } } : n)),
      }
    case 'REMOVE_NODE':
      return { ...state, nodes: state.nodes.filter(n => n.id !== action.id), edges: state.edges.filter(e => e.source !== action.id && e.target !== action.id), selectedNodeId: state.selectedNodeId === action.id ? null : state.selectedNodeId }
    case 'ADD_EDGE':
      return { ...state, edges: [...state.edges, action.edge] }
    case 'REMOVE_EDGE':
      return { ...state, edges: state.edges.filter(e => e.id !== action.id) }
    case 'UPDATE_EDGE':
      return { ...state, edges: state.edges.map(e => (e.id === action.id ? { ...e, ...action.updates } : e)) }
    case 'SET_SELECTED':
      return { ...state, selectedNodeId: action.id }
    case 'LOAD_FLOW':
      return { ...state, nodes: action.nodes || [], edges: action.edges || [], selectedNodeId: null }
    default:
      return state
  }
}
