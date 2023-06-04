import React from "react";
import { Card } from "@/types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type CardProps = {
  name: string,
  placeholder: string,
  index: number,
  columnIndex: number,
  onChange: Function,
  setEditMode: Function,
  card: Card,
}

const Container: (
  { name, placeholder, index, columnIndex, onChange, setEditMode, card }: CardProps
) => JSX.Element = ({ name, placeholder, index, columnIndex, onChange, setEditMode, card }: CardProps) => {
  return <div className="flex items-start justify-between p-2 w-64 rounded bg-gray-700 hover:bg-gray-600 duration-200 text-white">
    {card.editMode ? (
      <input
        type="text"
        value={card.content}
        name={name}
        className="w-full mr-2 rounded bg-gray-300 text-black p-1"
        placeholder={placeholder}
        onChange={(event) => onChange(event, index, columnIndex)}
      />
    ) : (
      <div className="font-bold">{card.content}</div>
    )}

    <div className="flex space-x-2 flex-none">
      {card.editMode ? (
        <>
          <button onClick={() => setEditMode(false, false, index, columnIndex)} className="p-2 bg-red-700 hover:bg-red-500 duration-200 rounded">
            <FontAwesomeIcon className="text-white !h-4 !w-4" icon="xmark" />
          </button>
          <button onClick={() => setEditMode(false, true, index, columnIndex)} className="p-2 h-8 bg-gray-800 hover:bg-gray-500 duration-200 rounded">
            <FontAwesomeIcon className="text-white !h-4 !w-4" icon="floppy-disk" />
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setEditMode(true, false, index, columnIndex)} className="p-2 bg-gray-800 hover:bg-gray-500 duration-200 rounded">
            <FontAwesomeIcon className="text-white !h-4 !w-4" icon="edit" />
          </button>
          <button className="p-2 bg-red-700 hover:bg-red-500 duration-200 rounded">
            <FontAwesomeIcon className="text-white !h-4 !w-4" icon="trash" />
          </button>
        </>
        )}
    </div>
  </div>
}

export default Container