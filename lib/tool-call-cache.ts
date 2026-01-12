export type ToolCallCache = {
  has: (id: string) => boolean;
  add: (id: string) => void;
  clear: () => void;
  size: () => number;
};

export function createToolCallCache(limit: number): ToolCallCache {
  const order: string[] = [];
  const ids = new Set<string>();

  return {
    has: (id: string) => ids.has(id),
    add: (id: string) => {
      if (ids.has(id)) return;
      ids.add(id);
      order.push(id);
      if (order.length > limit) {
        const oldest = order.shift();
        if (oldest) {
          ids.delete(oldest);
        }
      }
    },
    clear: () => {
      ids.clear();
      order.length = 0;
    },
    size: () => ids.size
  };
}
