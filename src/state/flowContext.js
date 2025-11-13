import React, { createContext, useReducer, useContext } from 'react'
import { flowReducer, initialState } from './flowReducer'

const FlowStateContext = createContext()
const FlowDispatchContext = createContext()

export function FlowProvider({ children }) {
  const [state, dispatch] = useReducer(flowReducer, initialState)
  return (
    <FlowStateContext.Provider value={state}>
      <FlowDispatchContext.Provider value={dispatch}>{children}</FlowDispatchContext.Provider>
    </FlowStateContext.Provider>
  )
}

export function useFlowState() {
  const ctx = useContext(FlowStateContext)
  if (!ctx) throw new Error('useFlowState must be used within FlowProvider')
  return ctx
}

export function useFlowDispatch() {
  const ctx = useContext(FlowDispatchContext)
  if (!ctx) throw new Error('useFlowDispatch must be used within FlowProvider')
  return ctx
}
