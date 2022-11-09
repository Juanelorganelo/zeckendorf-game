import React from 'react'
import { useElementSize } from 'usehooks-ts'

const DEFAULT_MAX_ITEMS_PER_ROW = 4

export interface BoardProps {
  values: number[]
  maxRowSize?: number
}

export const Board: React.FC<BoardProps> = ({
  values,
  maxRowSize = DEFAULT_MAX_ITEMS_PER_ROW,
  ...props
}) => {
  const numberOfCols = Math.min(values.length, maxRowSize)
  const [containerRef, { width: containerWidth }] =
    useElementSize<HTMLDivElement>()

  return (
    <div {...props} ref={containerRef} className="h-full w-full flex flex-wrap">
      {values.map((value) => (
        <span
          key={value}
          style={{
            fontSize: 80 - numberOfCols * 3,
            flexBasis: Math.floor(containerWidth / numberOfCols),
          }}
          tabIndex={-1}
          className="font-bold cursor-pointer border border-solid select-none flex items-center justify-center"
        >
          {value}
        </span>
      ))}
    </div>
  )
}
