export type CartLine = {
  itemId: string;
  quantity: number;
};

export type CartLineSummary = {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  lineTotal: number;
};
