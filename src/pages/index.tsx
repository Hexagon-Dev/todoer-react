import { Inter } from 'next/font/google'
import CardComponent from "@/components/Card";
import React from "react";
import { Card, Column } from "@/types";

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
    cards: [ card ],
  };

  const [columns, setColumns] = React.useState([column]);

  function handleCardContentChange(event: React.BaseSyntheticEvent, key: number) {
    setColumns(columns.slice().map((column) => {
      return {
        ...column,
        cards: column.cards.map((card, index) => {
          if (index === key) {
            card.content = event.target.value ?? '';
          }

          return card;
        }),
      };
    }));
  }

  function setEditMode(active: boolean, save: boolean, key: number, columnKey: number) {
    const card = columns[columnKey].cards[key];

    if (!active) {
      if (save) {
        card.initialContent = card.content;
      } else {
        card.content = card.initialContent;
      }

      if (card.content === '') {
        console.log('delete')

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
    setColumns(columns.slice().map((column, colIndex) => {
      if (index === colIndex) {
        const cards = column.cards.slice();
        cards.push({
          content: '',
          initialContent: '',
          createdAt: new Date(),
          editMode: true,
        });

        return {
          ...column,
          cards,
        };
      } else {
        return column;
      }
    }));
  }

  function isEmptyInColumn(index: number) {
    return columns[index].cards.slice().filter((card) => {
      return card.content === '';
    }).length > 0;
  }

  return (
    <main className={`flex min-h-screen flex-col justify-between p-4 ${inter.className}`}>
      <div className="flex space-x-4">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="p-2 rounded bg-gray-800">
            <p className="mb-1">{column.name}</p>

            <div className="space-y-2">
              {column.cards.map((card, index) => (
                <CardComponent
                  name={`card_${index}`}
                  onChange={handleCardContentChange}
                  placeholder="Enter info..."
                  key={index}
                  index={index}
                  columnIndex={columnIndex}
                  setEditMode={setEditMode}
                  card={card}
                />
              ))}

              <button
                disabled={isEmptyInColumn(columnIndex)}
                onClick={() => {addCard(columnIndex)}}
                className="p-1 w-full text-sm font-bold bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:hover:bg-gray-800 duration-200 rounded"
              >
                ADD CARD
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
