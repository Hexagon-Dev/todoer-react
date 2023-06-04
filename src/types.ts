export interface Card {
  content: string;
  initialContent: string;
  createdAt: Date;
  editMode: boolean;
}

export interface Column {
  name: string;
  initialName: string;
  cards: Card[];
  editMode: boolean;
}