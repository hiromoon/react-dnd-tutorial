import React from 'react'
import { Square } from './Square'
import { canMoveKnight, moveKnight } from './Game'
import { ItemTypes } from './Constants'
import { useDrop } from 'react-dnd'

const Overray: React.FC<{color: string}> = ({color}) => <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: color
          }}
        />

export const BoardSquare:React.FC<{x: number, y: number}> = ({ x, y, children}) => {
  const black = (x + y) % 2 === 1
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    canDrop: () => canMoveKnight(x, y),
    drop: () => moveKnight(x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })
  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
          width: '100%',
          height: '100%',
      }}
    >
    <Square black={black}>{children}</Square>
    { isOver && !canDrop && <Overray color="red" /> }
    { !isOver && canDrop && <Overray color="yellow" /> }
    { isOver && canDrop && <Overray color="green" /> }
  </div>
  )
}