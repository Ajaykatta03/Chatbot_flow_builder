
# Bitespeed Flow Builder

Pixel-perfect React Flow builder for WhatsApp/Chatbot flows.

## Features
- Drag and drop nodes from the right panel onto the canvas
- Editable message nodes with WhatsApp and chat icons
- Save/export flow with validation
- Context-based state management (nodes, edges, selection)
- Responsive UI with Bootstrap styling

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```
Output will be in the `build` folder.

## Project Structure & Flow

- **src/components/Canvas/FlowCanvas.js**: Main canvas, manages nodes/edges, drag/drop logic
- **src/components/Canvas/nodes/TextNode.js**: Custom WhatsApp message node (icons, editable text)
- **src/components/SidePanel/NodesPanel.js**: List of draggable node types
- **src/components/SidePanel/SettingsPanel.js**: Edit selected node's message
- **src/components/TopBar/TopBar.js**: Save/export button, validation banner
- **src/state/flowContext.js**: Global state/context for nodes/edges/selection
- **src/utils/nodeSchemas.js**: Node type definitions

## Styling
- Uses Bootstrap for global styles
- Custom CSS for layout and node appearance

## How the Flow Works
1. Drag a node from the right panel to the canvas
2. Click a node to edit its message in the right panel
3. Connect nodes by dragging edges
4. Click 'Save Changes' to validate and export the flow as JSON

---
For questions or improvements, open an issue or contact the maintainer.
