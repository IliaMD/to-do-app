export type CardsType = {
  title: string;
  description: string;
  priority: string;
  id: string;
  columnId: string;
};

export type ColumnsType = {
  name: string;
  columnId: string;
};

export const cards: CardsType[] = [];

export const buttons = [
  { text: "high", themes: "high" },
  { text: "medium", themes: "medium" },
  { text: "low", themes: "low" },
];

export const columns: ColumnsType[] = [
  { name: "To do", columnId: "1" },
  { name: "Completed", columnId: "2" },
  { name: "Frozen", columnId: "3" },
];
