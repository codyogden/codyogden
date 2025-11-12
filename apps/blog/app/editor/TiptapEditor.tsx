'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Blockquote from '@tiptap/extension-blockquote'
import { DragHandle } from '@tiptap/extension-drag-handle-react'
import Mention from '@tiptap/extension-mention'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Details, DetailsSummary, DetailsContent } from '@tiptap/extension-details'
import { ListKit } from '@tiptap/extension-list'
import { TextSelection, AllSelection } from '@tiptap/pm/state'
import { Fragment, Slice } from '@tiptap/pm/model'
import { wrappingInputRule, InputRule, Extension } from '@tiptap/core'
import { PluginKey } from '@tiptap/pm/state'
import { Suggestion } from '@tiptap/suggestion'
import { Columns, Column } from './extensions/columns'
import { createLowlight } from 'lowlight'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import sql from 'highlight.js/lib/languages/sql'
import { submitEditorData } from './actions'
import { useTransition, useRef } from 'react'

// Create lowlight instance with common languages
const lowlight = createLowlight()
lowlight.register('javascript', javascript)
lowlight.register('typescript', typescript)
lowlight.register('python', python)
lowlight.register('java', java)
lowlight.register('css', css)
lowlight.register('html', html)
lowlight.register('json', json)
lowlight.register('bash', bash)
lowlight.register('sql', sql)

// Custom Blockquote extension that uses '|' instead of '>'
const CustomBlockquote = Blockquote.extend({
  addInputRules() {
    return [
      wrappingInputRule({
        find: /^\|\s$/,
        type: this.type,
      }),
    ]
  },
})

// Custom Details extension that uses '>' as trigger
const CustomDetails = Details.extend({
  addInputRules() {
    return [
      new InputRule({
        find: /^\s*>\s$/,
        handler: ({ state, range, match, chain }) => {
          const { schema } = state
          const { from, to } = range
          
          // Create the details node structure manually
          // detailsSummary typically accepts inline content (text), not block content
          const detailsSummary = schema.nodes.detailsSummary.create(
            {},
            schema.text('Summary')
          )
          const detailsContent = schema.nodes.detailsContent.create(
            {},
            schema.nodes.paragraph.create()
          )
          const detailsNode = schema.nodes.details.create(
            {},
            [detailsSummary, detailsContent]
          )
          
          // Delete the matched text ('> ') and insert the details node
          chain()
            .deleteRange({ from, to })
            .insertContentAt(from, detailsNode)
            .run()
        },
      }),
    ]
  },
})

// Example users for mentions - replace with your own data source
const mentionSuggestion = {
  items: ({ query }: { query: string }) => {
    const users = [
      { id: '1', label: 'Harry Potter' },
      { id: '2', label: 'Hermione Granger' },
      { id: '3', label: 'Ron Weasley' },
      { id: '4', label: 'Draco Malfoy' },
      { id: '5', label: 'Luna Lovegood' },
      { id: '6', label: 'Neville Longbottom' },
      { id: '7', label: 'Ginny Weasley' },
      { id: '8', label: 'Fred Weasley' },
      { id: '9', label: 'George Weasley' },
      { id: '10', label: 'Bill Weasley' },
      { id: '11', label: 'Charlie Weasley' },
      { id: '12', label: 'Percy Weasley' },
      { id: '13', label: 'Molly Weasley' },
      { id: '14', label: 'Sirius Black' },
      { id: '15', label: 'Remus Lupin' },
      { id: '16', label: 'Nymphadora Tonks' },
      { id: '17', label: 'Ted Tonks' },
      { id: '18', label: 'Kingsley Shacklebolt' },
      { id: '19', label: 'Albus Dumbledore' },
      { id: '20', label: 'Severus Snape' },
      { id: '21', label: 'Alastor Moody' },
      { id: '22', label: 'Dolores Umbridge' },
      { id: '23', label: 'Minerva McGonagall' },
      { id: '24', label: 'Rubeus Hagrid' },
      { id: '25', label: 'Griphook' },
      { id: '26', label: 'Barty Crouch Jr.' },
      { id: '27', label: 'Bathilda Bagshot' },
      { id: '28', label: 'Arthur Weasley' },
    ]
    
    // Use regex to match query anywhere in the name (case-insensitive)
    const queryRegex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    return users
      .filter(user => queryRegex.test(user.label))
      .slice(0, 5)
  },
  render: () => {
    let component: HTMLDivElement | null = null
    let selectedIndex = 0
    let currentItems: any[] = []
    let currentCommand: ((item: any) => void) | null = null

    return {
      onStart: (props: any) => {
        component = document.createElement('div')
        component.classList.add('mention-suggestion-list')
        component.style.cssText = `
          position: fixed;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 0.25rem;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
        `

        document.body.appendChild(component)
        selectedIndex = 0
        currentItems = props.items || []
        currentCommand = props.command
        
        // Set initial position if available
        if (props.clientRect) {
          const rect = typeof props.clientRect === 'function' 
            ? props.clientRect() 
            : props.clientRect
          
          component.style.left = `${rect.left}px`
          component.style.top = `${rect.bottom + 4}px`
        }
      },
      onUpdate: (props: any) => {
        if (!component) return
        
        component.innerHTML = ''
        
        // Update current items and command
        currentItems = props.items || []
        currentCommand = props.command
        
        // Position the dropdown relative to the cursor
        if (props.clientRect) {
          const rect = typeof props.clientRect === 'function' 
            ? props.clientRect() 
            : props.clientRect
          
          component.style.position = 'fixed'
          component.style.left = `${rect.left}px`
          component.style.top = `${rect.bottom + 4}px`
          component.style.transform = 'none'
        }
        
        // Check if items exist and is an array
        if (!props.items || !Array.isArray(props.items)) {
          return
        }
        
        // Reset selected index if it's out of bounds
        if (selectedIndex >= props.items.length) {
          selectedIndex = 0
        }
        
        props.items.forEach((item: any, index: number) => {
          const itemElement = document.createElement('div')
          itemElement.classList.add('mention-suggestion-item')
          itemElement.setAttribute('data-index', index.toString())
          const isSelected = selectedIndex === index
          itemElement.style.cssText = `
            padding: 0.5rem 0.75rem;
            cursor: pointer;
            border-radius: 0.25rem;
            ${isSelected ? 'background: #f3f4f6;' : ''}
          `
          itemElement.textContent = item.label
          itemElement.addEventListener('mouseenter', () => {
            selectedIndex = index
            // Update highlighting
            if (component) {
              const items = component.querySelectorAll('.mention-suggestion-item')
              items.forEach((el, i) => {
                if (i === index) {
                  (el as HTMLElement).style.background = '#f3f4f6'
                } else {
                  (el as HTMLElement).style.background = ''
                }
              })
            }
          })
          itemElement.addEventListener('click', () => {
            props.command(item)
          })
          if (component) {
            component.appendChild(itemElement)
          }
        })
        
        // Ensure the first item is highlighted initially
        if (props.items.length > 0 && selectedIndex === 0) {
          const firstItem = component?.querySelector('.mention-suggestion-item')
          if (firstItem) {
            (firstItem as HTMLElement).style.background = '#f3f4f6'
          }
        }
      },
      onKeyDown: (props: { event: KeyboardEvent; view: any; range: any }) => {
        if (!component || !currentItems || !Array.isArray(currentItems) || currentItems.length === 0) {
          return false
        }
        
        const event = props.event
        if (!event || !event.key) {
          return false
        }
        
        // Helper function to update highlighting
        const updateHighlighting = () => {
          if (!component) return
          const items = component.querySelectorAll('.mention-suggestion-item')
          items.forEach((el, i) => {
            if (i === selectedIndex) {
              (el as HTMLElement).style.background = '#f3f4f6'
              el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
            } else {
              (el as HTMLElement).style.background = ''
            }
          })
        }
        
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          event.stopPropagation()
          selectedIndex = Math.max(0, selectedIndex - 1)
          updateHighlighting()
          return true
        }
        
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          event.stopPropagation()
          selectedIndex = Math.min(currentItems.length - 1, selectedIndex + 1)
          updateHighlighting()
          return true
        }
        
        if (event.key === 'Enter') {
          event.preventDefault()
          event.stopPropagation()
          if (currentItems && currentItems[selectedIndex] && currentCommand) {
            const selectedItem = currentItems[selectedIndex]
            currentCommand(selectedItem)
            return true
          }
        }
        
        if (event.key === 'Tab') {
          event.preventDefault()
          event.stopPropagation()
          if (currentItems && currentItems[selectedIndex] && currentCommand) {
            const selectedItem = currentItems[selectedIndex]
            currentCommand(selectedItem)
            return true
          }
        }
        
        if (event.key === 'Escape') {
          return false // Let Tiptap handle escape
        }
        
        return false
      },
      onExit: () => {
        if (component && component.parentNode) {
          component.parentNode.removeChild(component)
          component = null
        }
        selectedIndex = 0
      },
    }
  },
}

// Block types for slash command menu
interface BlockType {
  id: string
  label: string
  description: string
  icon?: string
}

const blockTypes: BlockType[] = [
  { id: 'heading1', label: 'Heading 1', description: 'Large heading' },
  { id: 'heading2', label: 'Heading 2', description: 'Medium heading' },
  { id: 'heading3', label: 'Heading 3', description: 'Small heading' },
  { id: 'codeBlock', label: 'Code Block', description: 'Code block with syntax highlighting' },
  { id: 'blockquote', label: 'Quote', description: 'Blockquote' },
  { id: 'bulletList', label: 'Bullet List', description: 'Unordered list' },
  { id: 'orderedList', label: 'Numbered List', description: 'Ordered list' },
  { id: 'taskList', label: 'Task List', description: 'Checkbox list' },
  { id: 'details', label: 'Details', description: 'Collapsible details section' },
  { id: 'columns2', label: '2 Columns', description: 'Two column layout' },
  { id: 'columns3', label: '3 Columns', description: 'Three column layout' },
]

// Slash command suggestion configuration
const slashCommandSuggestion = {
  items: ({ query }: { query: string }) => {
    // If query is empty, return all block types
    if (!query || query.trim() === '') {
      return blockTypes.slice(0, 10)
    }
    
    const trimmedQuery = query.trim().toLowerCase()
    
    // Check for shortcuts like /h1, /h2, /h3
    const headingShortcutMatch = trimmedQuery.match(/^h([1-3])$/)
    if (headingShortcutMatch) {
      const level = parseInt(headingShortcutMatch[1])
      const headingBlock = blockTypes.find(block => block.id === `heading${level}`)
      return headingBlock ? [headingBlock] : []
    }
    
    // Filter block types based on query (case-insensitive)
    const queryRegex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    return blockTypes
      .filter(block => queryRegex.test(block.label) || queryRegex.test(block.description))
      .slice(0, 10)
  },
  render: () => {
    let component: HTMLDivElement | null = null
    let selectedIndex = 0
    let currentItems: any[] = []
    let currentCommand: ((item: any) => void) | null = null

    return {
      onStart: (props: any) => {
        component = document.createElement('div')
        component.classList.add('slash-command-list')
        component.style.cssText = `
          position: fixed;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 0.25rem;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
        `

        document.body.appendChild(component)
        selectedIndex = 0
        currentItems = props.items || []
        currentCommand = props.command
        
        // Set initial position if available
        if (props.clientRect) {
          const rect = typeof props.clientRect === 'function' 
            ? props.clientRect() 
            : props.clientRect
          
          component.style.left = `${rect.left}px`
          component.style.top = `${rect.bottom + 4}px`
        }
      },
      onUpdate: (props: any) => {
        if (!component) return
        
        component.innerHTML = ''
        
        // Update current items and command
        currentItems = props.items || []
        currentCommand = props.command
        
        // Position the dropdown relative to the cursor
        if (props.clientRect) {
          const rect = typeof props.clientRect === 'function' 
            ? props.clientRect() 
            : props.clientRect
          
          component.style.position = 'fixed'
          component.style.left = `${rect.left}px`
          component.style.top = `${rect.bottom + 4}px`
          component.style.transform = 'none'
        }
        
        // Check if items exist and is an array
        if (!props.items || !Array.isArray(props.items)) {
          return
        }
        
        // Reset selected index if it's out of bounds
        if (selectedIndex >= props.items.length) {
          selectedIndex = 0
        }
        
        props.items.forEach((item: BlockType, index: number) => {
          const itemElement = document.createElement('div')
          itemElement.classList.add('slash-command-item')
          itemElement.setAttribute('data-index', index.toString())
          const isSelected = selectedIndex === index
          itemElement.style.cssText = `
            padding: 0.5rem 0.75rem;
            cursor: pointer;
            border-radius: 0.25rem;
            ${isSelected ? 'background: #f3f4f6;' : ''}
          `
          
          const labelElement = document.createElement('div')
          labelElement.style.cssText = 'font-weight: 500; font-size: 0.875rem;'
          labelElement.textContent = item.label
          
          itemElement.appendChild(labelElement)
          
          itemElement.addEventListener('mouseenter', () => {
            selectedIndex = index
            // Update highlighting
            if (component) {
              const items = component.querySelectorAll('.slash-command-item')
              items.forEach((el, i) => {
                if (i === index) {
                  (el as HTMLElement).style.background = '#f3f4f6'
                } else {
                  (el as HTMLElement).style.background = ''
                }
              })
            }
          })
          itemElement.addEventListener('click', () => {
            props.command(item)
          })
          if (component) {
            component.appendChild(itemElement)
          }
        })
        
        // Ensure the first item is highlighted initially
        if (props.items.length > 0 && selectedIndex === 0) {
          const firstItem = component?.querySelector('.slash-command-item')
          if (firstItem) {
            (firstItem as HTMLElement).style.background = '#f3f4f6'
          }
        }
      },
      onKeyDown: (props: { event: KeyboardEvent; view: any; range: any; command?: (item: any) => void }) => {
        if (!component || !currentItems || !Array.isArray(currentItems) || currentItems.length === 0) {
          return false
        }
        
        const event = props.event
        if (!event || !event.key) {
          return false
        }
        
        // Use the command from props if available, otherwise use stored command
        const command = props.command || currentCommand
        
        // Helper function to update highlighting
        const updateHighlighting = () => {
          if (!component) return
          const items = component.querySelectorAll('.slash-command-item')
          items.forEach((el, i) => {
            if (i === selectedIndex) {
              (el as HTMLElement).style.background = '#f3f4f6'
              el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
            } else {
              (el as HTMLElement).style.background = ''
            }
          })
        }
        
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          event.stopPropagation()
          selectedIndex = Math.max(0, selectedIndex - 1)
          updateHighlighting()
          return true
        }
        
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          event.stopPropagation()
          selectedIndex = Math.min(currentItems.length - 1, selectedIndex + 1)
          updateHighlighting()
          return true
        }
        
        if (event.key === 'Enter') {
          event.preventDefault()
          event.stopPropagation()
          if (currentItems && currentItems[selectedIndex] && command) {
            const selectedItem = currentItems[selectedIndex]
            command(selectedItem)
            return true
          }
        }
        
        if (event.key === 'Tab') {
          event.preventDefault()
          event.stopPropagation()
          if (currentItems && currentItems[selectedIndex] && command) {
            const selectedItem = currentItems[selectedIndex]
            command(selectedItem)
            return true
          }
        }
        
        if (event.key === 'Escape') {
          return false // Let Tiptap handle escape
        }
        
        return false
      },
      onExit: () => {
        if (component && component.parentNode) {
          component.parentNode.removeChild(component)
          component = null
        }
        selectedIndex = 0
      },
    }
  },
}

// SlashCommand extension - similar to Mention but triggers on '/' and replaces blocks
const SlashCommand = Extension.create({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        pluginKey: new PluginKey('slashCommand'),
        allowSpaces: false,
        command: ({ editor, range, props }: any) => {
          // Handle both direct item and props.item
          const blockType = (props?.item || props) as BlockType
          
          if (!blockType || !blockType.id) {
            return
          }
          
          const { state } = editor.view
          const { schema } = state
          
          // Create the appropriate node based on block type
          let newNode
          
          switch (blockType.id) {
            case 'heading1':
              newNode = schema.nodes.heading.create({ level: 1 })
              break
            case 'heading2':
              newNode = schema.nodes.heading.create({ level: 2 })
              break
            case 'heading3':
              newNode = schema.nodes.heading.create({ level: 3 })
              break
            case 'codeBlock':
              newNode = schema.nodes.codeBlock.create()
              break
            case 'blockquote':
              newNode = schema.nodes.blockquote.create(
                {},
                schema.nodes.paragraph.create()
              )
              break
            case 'bulletList':
              newNode = schema.nodes.bulletList.create(
                {},
                schema.nodes.listItem.create(
                  {},
                  schema.nodes.paragraph.create()
                )
              )
              break
            case 'orderedList':
              newNode = schema.nodes.orderedList.create(
                {},
                schema.nodes.listItem.create(
                  {},
                  schema.nodes.paragraph.create()
                )
              )
              break
            case 'taskList':
              newNode = schema.nodes.taskList.create(
                {},
                schema.nodes.taskItem.create(
                  {},
                  schema.nodes.paragraph.create()
                )
              )
              break
            case 'details':
              const detailsSummary = schema.nodes.detailsSummary.create(
                {},
                schema.text('Summary')
              )
              const detailsContent = schema.nodes.detailsContent.create(
                {},
                schema.nodes.paragraph.create()
              )
              newNode = schema.nodes.details.create(
                {},
                [detailsSummary, detailsContent]
              )
              break
            case 'paragraph':
            default:
              newNode = schema.nodes.paragraph.create()
          }
          
          // Delete the slash command and transform the block type
          // Use chain API to avoid creating extra nodes
          const chain = editor.chain().focus().deleteRange({ from: range.from, to: range.to })
          
          // Apply the appropriate command based on block type
          switch (blockType.id) {
            case 'heading1':
              chain.setHeading({ level: 1 })
              break
            case 'heading2':
              chain.setHeading({ level: 2 })
              break
            case 'heading3':
              chain.setHeading({ level: 3 })
              break
            case 'codeBlock':
              chain.toggleCodeBlock()
              break
            case 'blockquote':
              chain.toggleBlockquote()
              break
            case 'bulletList':
              chain.toggleBulletList()
              break
            case 'orderedList':
              chain.toggleOrderedList()
              break
            case 'taskList':
              chain.toggleTaskList()
              break
            case 'details':
              // For details, we need to use manual replacement
              const tr = state.tr
              tr.delete(range.from, range.to)
              const posAfterDeletion = range.from
              const $afterDelete = tr.doc.resolve(posAfterDeletion)
              let depth = $afterDelete.depth
              let node = $afterDelete.node(depth)
              while (depth > 0 && !node.isBlock) {
                depth--
                node = $afterDelete.node(depth)
              }
              const blockStart = $afterDelete.start(depth)
              const blockEnd = blockStart + node.nodeSize
              if (blockStart >= 0 && blockEnd <= tr.doc.content.size && blockStart < blockEnd) {
                tr.replaceWith(blockStart, blockEnd, newNode)
                const newPos = blockStart + 1
                if (newPos < tr.doc.content.size) {
                  const $pos = tr.doc.resolve(newPos)
                  // Find a valid text position within the new node
                  const textPos = $pos.textOffset >= 0 ? newPos : $pos.end()
                  if (textPos >= 0 && textPos < tr.doc.content.size) {
                    const $textPos = tr.doc.resolve(textPos)
                    try {
                      tr.setSelection(TextSelection.create(tr.doc, textPos))
                    } catch {
                      // If selection creation fails, use a safe position
                      const safePos = Math.max(1, Math.min(textPos, tr.doc.content.size - 1))
                      tr.setSelection(TextSelection.create(tr.doc, safePos))
                    }
                  }
                }
              }
              editor.view.dispatch(tr)
              return
            case 'columns2':
            case 'columns3':
              // For columns, create the columns structure
              const columnCount = blockType.id === 'columns2' ? 2 : 3
              
              // Build the columns JSON structure
              const columnsContent = {
                type: 'columns',
                attrs: { count: columnCount },
                content: Array.from({ length: columnCount }, () => ({
                  type: 'column',
                  content: [
                    {
                      type: 'paragraph',
                    },
                  ],
                })),
              }
              
              // Delete the slash command and insert columns, then set cursor to first column
              const deleteFrom = range.from
              const deleteTo = range.to
              
              // First, delete the slash command
              editor.chain()
                .focus()
                .deleteRange({ from: deleteFrom, to: deleteTo })
                .run()
              
              // Calculate where the columns will be inserted (after deletion)
              const insertPos = deleteFrom
              
              // Insert the columns content
              editor.chain()
                .insertContentAt(insertPos, columnsContent)
                .run()
              
              // Now set cursor to first column's first paragraph
              // Position calculation: insertPos + 1 (after columns opening) + 1 (after first column opening) + 1 (after first paragraph opening)
              const firstColumnStart = insertPos + 1
              const firstParagraphStart = firstColumnStart + 1
              
              // Use setTimeout to ensure the content is inserted before setting selection
              setTimeout(() => {
                try {
                  const { state } = editor.view
                  const $pos = state.doc.resolve(firstParagraphStart)
                  if ($pos.textOffset >= 0) {
                    editor.commands.setTextSelection(firstParagraphStart)
                  } else {
                    // Try the position right after paragraph opening
                    editor.commands.setTextSelection(firstParagraphStart + 1)
                  }
                } catch (e) {
                  // If that fails, find the columns node and set selection there
                  const { state } = editor.view
                  let columnsPos = -1
                  state.doc.descendants((node: any, pos: number) => {
                    if (node.type.name === 'columns' && columnsPos === -1) {
                      columnsPos = pos
                      return false
                    }
                  })
                  if (columnsPos >= 0) {
                    const safePos = columnsPos + 1 + 1 + 1 // columns + first column + first paragraph
                    editor.commands.setTextSelection(safePos)
                  }
                }
              }, 10)
              
              return
            default:
              // For paragraph or unknown types, just delete and let it be a paragraph
              chain.run()
              return
          }
          
          chain.run()
        },
        allow: ({ state, range }: any) => {
          const { $from } = state.selection
          const node = $from.node()
          
          // Only allow in block nodes (paragraph, heading, etc.)
          if (!node.isBlock) {
            return false
          }
          
          // Check if we're at the start of the block
          const blockStart = $from.start($from.depth)
          const currentPos = $from.pos
          
          // Get the text content from the start of the block to the cursor
          const textFromStart = node.textContent.slice(0, currentPos - blockStart)
          
          // Allow if the block starts with '/' and cursor is still at the beginning
          // This allows typing '/h1', '/h2', etc. without the menu disappearing
          const startsWithSlash = textFromStart.startsWith('/')
          const isAtBlockStart = currentPos <= blockStart + 50 // Allow up to 50 chars for commands like '/h1', '/code', etc.
          
          return startsWithSlash && isAtBlockStart
        },
        ...slashCommandSuggestion,
      },
    }
  },

  addProseMirrorPlugins() {
    if (!this.editor) {
      return []
    }
    
    const plugin = Suggestion({
      editor: this.editor,
      ...this.options.suggestion,
    })
    return [plugin]
  },
})

export default function TiptapEditor() {
  const [isPending, startTransition] = useTransition()
  const lastSelectAllWasNodeRef = useRef(false)
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default CodeBlock since we're using CodeBlockLowlight
        blockquote: false, // Disable default Blockquote since we're using CustomBlockquote
        bulletList: false, // Disable default BulletList since we're using ListKit
        orderedList: false, // Disable default OrderedList since we're using ListKit
      }),
      ListKit,
      CustomBlockquote,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      SlashCommand,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion: mentionSuggestion,
      }),
      // Add Details extensions last so their input rules are processed first (higher priority)
      CustomDetails,
      DetailsSummary,
      DetailsContent,
      // Add Columns extension - Column must come before Columns
      Column,
      Columns,
    ],
    content: null,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[500px] p-4',
        role: 'textbox',
        'data-form-type': 'other',
        autocomplete: 'off',
        'data-1p-ignore': 'true',
        'data-lpignore': 'true',
        'data-bwignore': 'true',
        'data-dashlane-ignore': 'true',
        'data-kwignore': 'true',
      },
      handleKeyDown: (view, event) => {
        // Check for CMD+A (Mac) or CTRL+A (Windows/Linux)
        if ((event.metaKey || event.ctrlKey) && event.key === 'a') {
          event.preventDefault()
          
          const { state } = view
          const { selection } = state
          const { $anchor } = selection
          
          // Find the block-level node (paragraph, heading, code block, etc.)
          let depth = $anchor.depth
          let node = $anchor.node(depth)
          
          // Walk up the tree to find a block node
          while (depth > 0 && !node.isBlock) {
            depth--
            node = $anchor.node(depth)
          }
          
          // Get the start and end positions of the node's content
          // For block nodes, we want to select the content, not including node boundaries
          const nodeStart = $anchor.start(depth)
          
          // Calculate the end position based on the node's content size
          // nodeStart is the position right after the node opening
          // node.content.size gives us the size of the content
          const nodeEnd = nodeStart + node.content.size
          
          // Ensure we don't go out of bounds
          const docSize = state.doc.content.size
          const safeNodeStart = Math.max(0, Math.min(nodeStart, docSize))
          const safeNodeEnd = Math.max(safeNodeStart, Math.min(nodeEnd, docSize))
          
          // Validate that the positions are valid
          if (safeNodeStart >= docSize || safeNodeEnd > docSize || safeNodeStart === safeNodeEnd) {
            // If positions are invalid or node is empty, fall back to selecting all
            const { tr } = state
            const allSelection = new AllSelection(state.doc)
            view.dispatch(tr.setSelection(allSelection))
            return true
          }
          
          // Check if the current selection already spans the entire current node
          const isNodeFullySelected = 
            selection.from === safeNodeStart && 
            selection.to === safeNodeEnd
          
          // If the node is already fully selected, or if the last CMD+A selected the node,
          // then select all content in the editor
          if (isNodeFullySelected || lastSelectAllWasNodeRef.current) {
            // Select all content in the editor
            const { tr } = state
            const allSelection = new AllSelection(state.doc)
            view.dispatch(tr.setSelection(allSelection))
            lastSelectAllWasNodeRef.current = false
            return true
          }
          
          // First CMD+A: select all content in the current node/block
          // Use TextSelection.between to ensure we get valid positions pointing to inline content
          const $start = state.doc.resolve(safeNodeStart)
          const $end = state.doc.resolve(safeNodeEnd)
          const nodeSelection = TextSelection.between($start, $end)
          
          view.dispatch(state.tr.setSelection(nodeSelection))
          lastSelectAllWasNodeRef.current = true
          
          // Reset the flag after a delay to allow for the second CMD+A
          setTimeout(() => {
            lastSelectAllWasNodeRef.current = false
          }, 1000)
          
          return true
        }
        
        // Check for CMD+Enter (Mac) or CTRL+Enter (Windows/Linux)
        // Creates a new empty block below the current block and moves cursor to it
        // Does NOT split/move text (unlike regular Enter)
        if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
          event.preventDefault()
          
          const { state } = view
          const { selection, schema } = state
          const { $anchor } = selection
          
          // Find the block-level node (paragraph, heading, code block, etc.)
          let depth = $anchor.depth
          let node = $anchor.node(depth)
          
          // Walk up the tree to find a block node
          while (depth > 0 && !node.isBlock) {
            depth--
            node = $anchor.node(depth)
          }
          
          // Get the position of the block node itself
          const blockNodePos = $anchor.before(depth)
          const blockNodeSize = node.nodeSize
          const afterBlockPos = blockNodePos + blockNodeSize
          
          // Create a new empty paragraph node
          const newParagraph = schema.nodes.paragraph.create()
          
          // Create a transaction
          const { tr } = state
          
          // Find the parent container to insert into
          // The parent is one level up from the block
          const parentDepth = depth - 1
          if (parentDepth > 0) {
            // We have a parent container (not at document level)
            const parentNode = $anchor.node(parentDepth)
            const parentPos = $anchor.before(parentDepth)
            
            // Find the index of the current block within the parent
            let blockIndex = 0
            let offset = $anchor.start(parentDepth)
            for (let i = 0; i < parentNode.childCount; i++) {
              const child = parentNode.child(i)
              if (offset === blockNodePos) {
                blockIndex = i
                break
              }
              offset += child.nodeSize
            }
            
            // Create a new fragment with the new paragraph inserted
            const beforeFragment = parentNode.content.cut(0, blockIndex + 1)
            const afterFragment = parentNode.content.cut(blockIndex + 1)
            const newFragment = Fragment.from([newParagraph])
            const combinedFragment = beforeFragment.append(newFragment).append(afterFragment)
            
            const newParent = parentNode.copy(combinedFragment)
            
            // Replace the parent with the new content
            const parentSlice = new Slice(Fragment.from([newParent]), 0, 0)
            tr.replace(parentPos, parentPos + parentNode.nodeSize, parentSlice)
            
            // Move cursor to the beginning of the new paragraph
            // Calculate the position of the new paragraph
            let newParagraphPos = $anchor.start(parentDepth)
            for (let i = 0; i <= blockIndex; i++) {
              newParagraphPos += parentNode.child(i).nodeSize
            }
            // Add the size of the current block to get past it
            newParagraphPos += node.nodeSize
            // The content of the paragraph starts at newParagraphPos + 1
            const newParagraphStart = newParagraphPos + 1
            
            // Create selection at the start of the new paragraph
            const newSelection = TextSelection.create(tr.doc, newParagraphStart)
            tr.setSelection(newSelection)
          } else {
            // We're at the document level (parentDepth === 0 or -1)
            // Insert the new paragraph directly after the current block
            const slice = new Slice(Fragment.from([newParagraph]), 0, 0)
            tr.replace(afterBlockPos, afterBlockPos, slice)
            
            const newParagraphStart = afterBlockPos + 1
            const newSelection = TextSelection.create(tr.doc, newParagraphStart)
            tr.setSelection(newSelection)
          }
          
          // Dispatch the transaction
          view.dispatch(tr)
          
          return true
        }
        
        // Reset the flag if any other key is pressed
        if (event.key !== 'a' || (!event.metaKey && !event.ctrlKey)) {
          lastSelectAllWasNodeRef.current = false
        }
        
        // Stop propagation for arrow keys to prevent browser extensions from interfering
        // This prevents password manager extensions from trying to handle arrow key events
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || 
            event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.stopPropagation()
        }
        
        return false
      },
    },
  })

//   const handleSubmit = () => {
//     if (!editor) return
    
//     const editorData = editor.getJSON()
//     const editorDataString = JSON.stringify(editorData)
    
//     startTransition(async () => {
//       await submitEditorData(editorDataString)
//     })
//   }

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-lg">
      <div className="relative">
        <EditorContent editor={editor} />
        <DragHandle editor={editor}>
          <div className="flex items-center justify-center w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded cursor-grab active:cursor-grabbing">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 2C4.55228 2 5 1.55228 5 1C5 0.447715 4.55228 0 4 0C3.44772 0 3 0.447715 3 1C3 1.55228 3.44772 2 4 2Z"
                fill="currentColor"
              />
              <path
                d="M4 7C4.55228 7 5 6.55228 5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7Z"
                fill="currentColor"
              />
              <path
                d="M4 12C4.55228 12 5 11.5523 5 11C5 10.4477 4.55228 10 4 10C3.44772 10 3 10.4477 3 11C3 11.5523 3.44772 12 4 12Z"
                fill="currentColor"
              />
              <path
                d="M8 2C8.55228 2 9 1.55228 9 1C9 0.447715 8.55228 0 8 0C7.44772 0 7 0.447715 7 1C7 1.55228 7.44772 2 8 2Z"
                fill="currentColor"
              />
              <path
                d="M8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5C7.44772 5 7 5.44772 7 6C7 6.55228 7.44772 7 8 7Z"
                fill="currentColor"
              />
              <path
                d="M8 12C8.55228 12 9 11.5523 9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </DragHandle>
      </div>
    </div>
  )
}

