import { Node, mergeAttributes, type RawCommands } from '@tiptap/core'
import { Fragment } from '@tiptap/pm/model'
import { TextSelection } from '@tiptap/pm/state'

// Column node - contains block content
export const Column = Node.create({
  name: 'column',

  content: 'block+',

  isolating: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'column',
        class: 'column',
      }),
      0,
    ]
  },

  addKeyboardShortcuts() {
    return {
      // Allow Enter to create new paragraphs within columns
      Enter: () => {
        return false // Let default behavior handle it
      },
      // Arrow key navigation between columns
      ArrowRight: ({ editor }) => {
        const { selection } = editor.state
        const { $from } = selection
        
        // Check if we're at the end of a column
        const columnNode = $from.node($from.depth)
        if (columnNode.type.name === 'column') {
          const columnEnd = $from.end($from.depth)
          if ($from.pos >= columnEnd - 1) {
            // We're at the end of the column, try to move to next column
            const columnsNode = $from.node($from.depth - 1)
            if (columnsNode.type.name === 'columns') {
              const columnIndex = $from.index($from.depth - 1)
              if (columnIndex < columnsNode.childCount - 1) {
                // Move to next column
                const nextColumn = columnsNode.child(columnIndex + 1)
                const nextColumnStart = $from.start($from.depth - 1) + columnsNode.child(columnIndex).nodeSize
                const nextColumnContentStart = nextColumnStart + 1
                editor.commands.setTextSelection(nextColumnContentStart)
                return true
              }
            }
          }
        }
        return false
      },
      ArrowLeft: ({ editor }) => {
        const { selection } = editor.state
        const { $from } = selection
        
        // Check if we're at the start of a column
        const columnNode = $from.node($from.depth)
        if (columnNode.type.name === 'column') {
          const columnStart = $from.start($from.depth)
          if ($from.pos <= columnStart + 1) {
            // We're at the start of the column, try to move to previous column
            const columnsNode = $from.node($from.depth - 1)
            if (columnsNode.type.name === 'columns') {
              const columnIndex = $from.index($from.depth - 1)
              if (columnIndex > 0) {
                // Move to previous column
                const prevColumn = columnsNode.child(columnIndex - 1)
                let prevColumnStart = $from.start($from.depth - 1)
                for (let i = 0; i < columnIndex; i++) {
                  prevColumnStart += columnsNode.child(i).nodeSize
                }
                const prevColumnEnd = prevColumnStart + prevColumn.nodeSize
                const prevColumnContentEnd = prevColumnEnd - 1
                editor.commands.setTextSelection(prevColumnContentEnd)
                return true
              }
            }
          }
        }
        return false
      },
    }
  },
})

// Columns container node - contains multiple column nodes
export const Columns = Node.create({
  name: 'columns',

  group: 'block',

  content: 'column{2,3}', // Must have 2 or 3 columns

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      count: {
        default: 2,
        parseHTML: (element) => {
          const count = parseInt(element.getAttribute('data-column-count') || '2', 10)
          return count === 3 ? 3 : 2
        },
        renderHTML: (attributes) => {
          return {
            'data-column-count': attributes.count || 2,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'columns',
        class: 'columns',
      }),
      0,
    ]
  },

  addCommands(): Partial<RawCommands> {
    return {
      setColumns: (count: 2 | 3) => ({ commands, state, tr, dispatch }: { commands: any; state: any; tr: any; dispatch: any }) => {
        const { selection } = state
        const { $from } = selection

        // Find the block node we're in
        let depth = $from.depth
        let node = $from.node(depth)

        while (depth > 0 && !node.isBlock) {
          depth--
          node = $from.node(depth)
        }

        const blockStart = $from.start(depth)
        const blockEnd = blockStart + node.nodeSize

        // Create column nodes
        const columnNodes = []
        for (let i = 0; i < count; i++) {
          const columnNode = state.schema.nodes.column.create(
            {},
            state.schema.nodes.paragraph.create()
          )
          columnNodes.push(columnNode)
        }

        // Create columns container
        const columnsNode = state.schema.nodes.columns.create(
          { count },
          Fragment.from(columnNodes)
        )

        if (dispatch) {
          tr.replaceWith(blockStart, blockEnd, columnsNode)
          // Set cursor to first column's first paragraph
          const firstColumnPos = blockStart + 1
          const firstParagraphPos = firstColumnPos + 1
          tr.setSelection(TextSelection.create(tr.doc, firstParagraphPos))
          dispatch(tr)
        }

        return true
      },
    } as Partial<RawCommands>
  },

  addKeyboardShortcuts() {
    return {
      // Allow Enter to work normally within columns
      Enter: () => {
        return false
      },
      // Backspace at start of first column should delete the columns
      Backspace: ({ editor }) => {
        const { selection } = editor.state
        const { $from } = selection

        // Check if we're at the start of a column
        if ($from.parentOffset === 0) {
          const columnNode = $from.node($from.depth)
          if (columnNode.type.name === 'column') {
            // Check if this is the first column and it's empty
            const columnsNode = $from.node($from.depth - 1)
            if (columnsNode.type.name === 'columns') {
              const columnIndex = $from.index($from.depth - 1)
              if (columnIndex === 0) {
                // Check if first column is empty
                const firstColumn = columnsNode.child(0)
                if (firstColumn.content.size === 0 || (firstColumn.content.size === 1 && firstColumn.content.firstChild?.type.name === 'paragraph' && firstColumn.content.firstChild.content.size === 0)) {
                  // Replace columns with a paragraph
                  const columnsStart = $from.start($from.depth - 1)
                  const columnsEnd = columnsStart + columnsNode.nodeSize
                  const paragraph = editor.state.schema.nodes.paragraph.create()
                  const tr = editor.state.tr.replaceWith(columnsStart, columnsEnd, paragraph)
                  tr.setSelection(TextSelection.create(tr.doc, columnsStart + 1))
                  editor.view.dispatch(tr)
                  return true
                }
              }
            }
          }
        }
        return false
      },
    }
  },
})

