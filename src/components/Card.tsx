import React, {ChangeEventHandler, useState} from "react";

type CardProps = {
  value: string,
  name: string,
  placeholder: string,
  onChange: ChangeEventHandler,
}

const Container = ({ value, name, placeholder, onChange }: CardProps) => {
  const [editMode, setEditMode] = useState(false)
  const [newValue, setNewValue] = useState('')

  function save() {
    setEditMode(false)
    value = newValue;
  }

  function cancel() {
    setEditMode(false)
    setNewValue('');
  }

  return <div className="flex items-start justify-between p-2 w-64 rounded bg-gray-700 hover:bg-gray-600 duration-200 text-white">
    {editMode ? (
      <input
        type="text"
        value={value}
        name={name}
        className="w-full mr-2 rounded bg-gray-300 text-black p-1"
        placeholder={placeholder}
        onChange={(event) => {setNewValue(newValue); onChange(event)}}
      />
    ) : (
      <div className="font-bold">{value}</div>
    )}

    <div className="flex space-x-2 flex-none">
      {editMode ? (
        <>
          <button onClick={cancel} className="p-2 bg-red-700 hover:bg-red-500 duration-200 rounded">
            <svg className="text-white h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M343 151a32 32 0 0 0-46-46L192 211 87 105a32 32 0 0 0-46 46l106 105L41 361a32 32 0 0 0 46 46l105-106 105 106a32 32 0 0 0 46-46L237 256l106-105z"/></svg>
          </button>
          <button onClick={save} className="p-2 bg-gray-800 hover:bg-gray-500 duration-200 rounded">
            <svg className="text-white h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C29 32 0 61 0 96v320c0 35 29 64 64 64h320c35 0 64-29 64-64V173c0-17-7-33-19-45l-77-77a64 64 0 0 0-45-19H64zm0 96c0-18 14-32 32-32h192c18 0 32 14 32 32v64c0 18-14 32-32 32H96c-18 0-32-14-32-32v-64zm160 160a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
          </button>
        </>
      ) : (
        <>
          <button onClick={() => {setEditMode(true)}} className="p-2 bg-gray-800 hover:bg-gray-500 duration-200 rounded">
            <svg className="text-white h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="m363 19-49 49 130 130 49-49c25-25 25-65 0-90l-40-40a64 64 0 0 0-90 0zm-71 71L59 324a89 89 0 0 0-23 37L1 481a24 24 0 0 0 30 30l120-35c14-4 27-12 37-22l234-234L292 90z"/></svg>
          </button>
          <button className="p-2 bg-red-700 hover:bg-red-500 duration-200 rounded">
            <svg className="text-white h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="m135 18-7 14H32a32 32 0 1 0 0 64h384a32 32 0 1 0 0-64h-96l-7-14c-6-11-17-18-29-18H164c-12 0-23 7-29 18zm281 110H32l21 339c2 25 23 45 48 45h246c25 0 46-20 48-45l21-339z"/></svg>
          </button>
        </>
        )}
    </div>
  </div>
}

export default Container