export type Cards = {
  title: string;
  description: string;
  priority: string;
};

export const cards: Cards[] = [
  {
    title: "помыть посуду",
    priority: "high",
    description: "мама мне оторвет голову, если не помою посуду",
  },
];

export const buttons = [
  { text: "high", themes: "high" },
  { text: "medium", themes: "medium" },
  { text: "low", themes: "low" },
];
