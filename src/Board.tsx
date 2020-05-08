import React, { useCallback } from 'react'
import { Square } from './Square'
import { Knight } from './Knight'
import { moveKnight, canMoveKnight } from './Game'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

interface renderSquareProps {
  i: number
  knightPosition: [number, number]
}
const RenderSquare: React.FC<renderSquareProps> =
  ({i, knightPosition}) => {
    const x = i % 8
    const y = Math.floor(i / 8)
    const [ knightX, knightY ] = knightPosition
    const isKnightHere = knightX === x && knightY === y
    const black = (x + y) % 2 === 1
    const piece = isKnightHere ? <Knight /> : null

    const handleSqureClick = useCallback(() => {
      if (canMoveKnight(x, y)) {
        moveKnight(x, y)
      }
    }, [x, y])

    return (
      <div onClick={handleSqureClick} style={{ width: '12.5%', height: '12.5%' }}>
        <Square black={black}>{piece}</Square>
      </div>
    )
  }

export const Board: React.FC<{knightPosition: [number, number]}> = ({knightPosition}) => {
  return (
    <DndProvider backend={Backend}>
      <div
        style={{
          width: '300px',
            height: '300px',
            display: 'flex',
            flexWrap: 'wrap'
        }}
      >
        {
          [ ...(new Array(64)) ].map((_, i) =>
            <RenderSquare key={i} i={i} knightPosition={knightPosition} />
          )
        }
      </div>
    </DndProvider>
  )
}
