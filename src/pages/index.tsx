import { Inter } from 'next/font/google'
import CardComponent from "@/components/Card";
import React from "react";
import { Card, Column } from "@/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const card : Card = {
    content: 'Buy milk',
    initialContent: 'Buy milk',
    createdAt: new Date(),
    editMode: false,
  }

  const column : Column = {
    name: 'TODO',
    initialName: 'TODO',
    cards: [ card ],
    editMode: false,
  };

  const [columns, setColumns] = React.useState([column]);

  function handleCardContentChange(event: React.BaseSyntheticEvent, key: number, columnKey: number) {
    columns[columnKey].cards[key].content = event.target.value ?? '';

    setColumns(columns.slice());
  }

  function setEditModeColumn(active: boolean, save: boolean, columnKey: number) {
    const column = columns[columnKey];

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
        columns.splice(columnKey, 1);

        setColumns(columns.slice());

        return;
      }
    } else {
      column.initialName = column.name;
    }

    column.editMode = active;

    setColumns(columns.slice());
  }

  function setEditModeCard(active: boolean, save: boolean, key: number, columnKey: number) {
    const card = columns[columnKey].cards[key];

    if (!active) {
      if (save) {
        card.initialContent = card.content;
      } else {
        card.content = card.initialContent;
      }

      if (card.content === '') {
        columns[columnKey].cards.splice(key, 1);

        setColumns(columns.slice());

        return;
      }
    } else {
      columns[columnKey].cards[key].initialContent = columns[columnKey].cards[key].content;
    }

    columns[columnKey].cards[key].editMode = active;

    setColumns(columns.slice());
  }

  function addCard(index: number) {
    columns[index].cards.push({
      content: '',
      initialContent: '',
      createdAt: new Date(),
      editMode: true,
    });

    setColumns(columns.slice());
  }

  function addColumn() {
    columns.push({
      name: '',
      initialName: '',
      cards: [],
      editMode: true,
    });

    setColumns(columns.slice());
  }

  function isEmptyInColumn(index: number) {
    return columns[index].cards.filter((card) => {
      return card.content === '';
    }).length > 0;
  }

  return (
    <main className={`flex min-h-screen flex-col justify-between p-4 ${inter.className}`}>
      <div className="flex space-x-4">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="p-2 rounded bg-gray-800 h-min">
            <div className="flex justify-between items-center mb-2">
              {column.editMode ? (
                <>
                  <input type="text" className="w-44 rounded bg-gray-300 text-black p-1" value={column.name} onChange={
                    (event) => {
                      columns[columnIndex].name = event.target.value;

                      setColumns(columns.slice());
                    }}
                  />

                  <button
                    onClick={() => setEditModeColumn(false, false, columnIndex)}
                    className="p-2 bg-red-700 hover:bg-red-500 duration-200 rounded"
                  >
                    <FontAwesomeIcon className="text-white !h-4 !w-4" icon="xmark" />
                  </button>
                  <button
                    onClick={() => setEditModeColumn(false, true, columnIndex)}
                    className="p-2 h-8 bg-gray-700 hover:bg-gray-500 duration-200 rounded"
                  >
                    <FontAwesomeIcon className="text-white !h-4 !w-4" icon="floppy-disk" />
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-1">{column.name}</p>

                  <button
                    onClick={() => setEditModeColumn(true, false, columnIndex)}
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
                  name={`card_${index}`}
                  onChange={handleCardContentChange}
                  placeholder="Enter info..."
                  key={index}
                  index={index}
                  columnIndex={columnIndex}
                  setEditMode={setEditModeCard}
                  card={card}
                />
              ))}

              <button
                disabled={isEmptyInColumn(columnIndex)}
                onClick={() => {addCard(columnIndex)}}
                className="btn-default w-64"
              >
                ADD CARD
              </button>
            </div>
          </div>
        ))}
        <div>
          <button onClick={addColumn} className="btn-default w-64">
            ADD COLUMN
          </button>
        </div>
      </div>
    </main>
  )
}
