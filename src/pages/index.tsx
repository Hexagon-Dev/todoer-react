import { Inter } from 'next/font/google'
import Card from "@/components/Card";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const columns = [
    {
      name: 'TODO',
      cards: [
        {
          content: 'Buy milk',
          createdAt: new Date(),
        },
      ],
    },
  ];

  return (
    <main className={`flex min-h-screen flex-col justify-between p-4 ${inter.className}`}>
      <div className="flex space-x-4">
        {columns.map((column, index) => (
          <div key={index} className="p-2 rounded bg-gray-800">
            <p className="mb-1">{column.name}</p>

            <div className="space-y-2">
              {column.cards.map((card, index) => (
                <Card
                  value={card.content}
                  name={`card_${index}`}
                  onChange={(event) => { card.content = event.target.textContent ?? '' }}
                  placeholder="Enter info..."
                  key={index}
                />
              ))}

              <button className="p-1 w-full text-sm font-bold bg-gray-700 hover:bg-gray-600 duration-200 rounded">
                ADD CARD
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
