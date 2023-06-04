import React from "react";
import {Card, Column} from "@/types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CardComponent from "@/components/Card";

type ColumnProps = {
  columnIndex: number,
  column: Column,
  setColumn: Function,
}

const Container: (
  { columnIndex, column, setColumn }: ColumnProps
) => JSX.Element = ({ columnIndex, column, setColumn }: ColumnProps) => {
  function setEditModeColumn(active: boolean, save: boolean) {
    if (!active) {
      if (save) {
        column.initialName = column.name;
      } else {
        column.name = column.initialName;
      }

      if (
        column.name === ''
        && (column.cards.length === 0 || confirm('Are you sure you want to delete this column? All cards would be lost.'))
      ) {
        setColumn(columnIndex, null);

        return;
      }
    } else {
      column.initialName = column.name;
    }

    column.editMode = active;

    setColumn(columnIndex, column);
  }

  function addCard() {
    column.cards.push({
      content: '',
      initialContent: '',
      createdAt: new Date(),
      editMode: true,
    });

    setColumn(column);
  }

  function setCard(index: number, card: Card|null) {
    if (card === null) {
      column.cards.splice(index, 1);
    } else {
      column.cards[index] = card;
    }

    setColumn(column);
  }

  return <div key={columnIndex} className="p-2 rounded bg-gray-800 h-min">
    <div className="flex justify-between items-center mb-2">
      {column.editMode ? (
        <>
          <input
            type="text"
            className="w-44 rounded bg-gray-300 text-black p-1"
            value={column.name}
            onChange={(event) => {
              column.name = event.target.value;

              setColumn(column);
            }}
          />

          <button
            onClick={() => setEditModeColumn(false, false)}
            className="p-2 bg-red-700 hover:bg-red-500 duration-200 rounded"
          >
            <FontAwesomeIcon className="text-white !h-4 !w-4" icon="xmark" />
          </button>
          <button
            onClick={() => setEditModeColumn(false, true)}
            className="p-2 h-8 bg-gray-700 hover:bg-gray-500 duration-200 rounded"
          >
            <FontAwesomeIcon className="text-white !h-4 !w-4" icon="floppy-disk" />
          </button>
        </>
      ) : (
        <>
          <p className="mb-1">{column.name}</p>

          <button
            onClick={() => setEditModeColumn(true, false)}
            className="p-2 bg-gray-700 hover:bg-gray-500 duration-200 rounded"
          >
            <FontAwesomeIcon className="text-white !h-4 !w-4" icon="edit" />
          </button>
        </>
      )}

    </div>

    <div className="space-y-2">
      {column.cards.map((card, index) => (
        <CardComponent
          key={index}
          cardIndex={index}
          card={card}
          setCard={setCard}
        />
      ))}

      <button
        disabled={column.cards.some((card) => card.editMode)}
        onClick={() => {addCard()}}
        className="btn-default w-64"
      >
        ADD CARD
      </button>
    </div>
  </div>
};

export default Container;