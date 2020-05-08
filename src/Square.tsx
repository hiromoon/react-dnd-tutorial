import React from 'react';

export const Square: React.FC<{black?: boolean}> = ({black, children}) => {
  const fill = black ? 'black' : 'white'
  const stroke = black ? 'white' : 'black'
  return (
    <div style={{ backgroundColor: fill, color: stroke, width: '100%', height: '100%' }}>{children}</div>)
}
