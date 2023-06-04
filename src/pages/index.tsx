import { Inter } from 'next/font/google'
import React from 'react';
import { Card, Column } from '@/types';

import ColumnComponent from '@/components/Column';
import useLocalStorage from '@/useLocalStorage';

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

  const [columns, setColumns] = useLocalStorage('columns', [column]);

  function setColumn(index: number, column: Column|null) {
    if (column === null) {
      columns.splice(index, 1);
    } else {
      columns[index] = column;
    }

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

  return (
    <main className={`flex flex-col justify-between p-4 ${inter.className}`}>
      <div className="flex space-x-4 overflow-y-auto pb-4">
        {columns.map((column: Column, columnIndex: number) => (
          <ColumnComponent
            key={columnIndex}
            columnIndex={columnIndex}
            setColumn={setColumn}
            column={column}
          />
        ))}
        <div>
          <button
            onClick={addColumn}
            disabled={columns.some((column: Column) => column.editMode)}
            className="btn-default w-64"
          >
            ADD COLUMN
          </button>
        </div>
      </div>
    </main>
  )
};
