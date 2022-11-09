import { v4 as uuidv4 } from "uuid";

export type CardType = {
  title: string;
  description: string;
  priority: string;
  id: string;
  columnId: string;
};

export const cardsDefault: Record<string, CardType> = {
  "0": {
    title: "",
    description: "",
    priority: "",
    id: uuidv4(),
    columnId: uuidv4(),
  },
};

export type ColumnsType = {
  name: string;
  columnId: string;
};

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
