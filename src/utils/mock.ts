export type Tasks = {
  title: string;
  description: string;
  priority: string;
};

export const tasks: Tasks[] = [
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
