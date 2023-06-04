import React from "react";
import { Card } from "@/types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CardProps = {
  card: Card,
  cardIndex: number,
  setCard: Function,
};

const Container: (
  { card, cardIndex, setCard }: CardProps
) => JSX.Element = ({ card, cardIndex, setCard }: CardProps) => {
  function setEditMode(active: boolean, save: boolean) {
    if (!active) {
      if (save) {
        card.initialContent = card.content;
      } else {
        card.content = card.initialContent;
      }

      if (card.content === '') {
        setCard(cardIndex, null);

        return;
      }
    } else {
      card.initialContent = card.content;
    }

    card.editMode = active;

    setCard(cardIndex, card);
  }

  return <div className="flex items-start justify-between p-2 w-64 rounded bg-gray-700 hover:bg-gray-600 duration-200 text-white">
    {card.editMode ? (
      <input
        type="text"
        value={card.content}
        name={`card_${cardIndex}`}
        className="w-full mr-2 rounded bg-gray-300 text-black p-1"
        placeholder="Enter info..."
        onChange={(event) => {
          card.content = event.target.value;

          setCard(cardIndex, card);
        }}
      />
    ) : (
      <div className="font-bold">{card.content}</div>
    )}

    <div className="flex space-x-2 flex-none">
      {card.editMode ? (
        <>
          <button onClick={() => setEditMode(false, false)} className="p-2 bg-red-700 hover:bg-red-500 duration-200 rounded">
            <FontAwesomeIcon className="text-white !h-4 !w-4" icon="xmark" />
          </button>
          <button onClick={() => setEditMode(false, true)} className="p-2 h-8 bg-gray-800 hover:bg-gray-500 duration-200 rounded">
            <FontAwesomeIcon className="text-white !h-4 !w-4" icon="floppy-disk" />
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setEditMode(true, false)} className="p-2 bg-gray-800 hover:bg-gray-500 duration-200 rounded">
            <FontAwesomeIcon className="text-white !h-4 !w-4" icon="edit" />
          </button>
          <button className="p-2 bg-red-700 hover:bg-red-500 duration-200 rounded">
            <FontAwesomeIcon className="text-white !h-4 !w-4" icon="trash" />
          </button>
        </>
        )}
    </div>
  </div>
};

export default Container;
