export const nodeSchemas = [
  {
    type: 'textNode',
    title: 'Text / Message',
    defaultData: { text: 'New message' },
  },
]

export function getDefaultNode(type, id, position = { x: 0, y: 0 }) {
  const schema = nodeSchemas.find(s => s.type === type)
  if (!schema) return null
  return {
    id,
    type: schema.type,
    position,
    data: { ...schema.defaultData, label: schema.title },
  }
}
