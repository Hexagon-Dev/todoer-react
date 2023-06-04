export interface Card {
  content: string;
  initialContent: string;
  createdAt: Date;
  editMode: boolean;
}

export interface Column {
  name: string;
  cards: Card[];
}