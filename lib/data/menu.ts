export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starter' | 'main' | 'drink' | 'dessert';
  tags: string[];
  image: string;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'burger-classic',
    name: 'Classic Cheeseburger',
    description: 'Quarter pounder beef patty with cheddar, lettuce, tomato, and house sauce.',
    price: 12.99,
    category: 'main',
    tags: ['meat', 'comfort food'],
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'taco-spicy',
    name: 'Diablo Tacos (3pcs)',
    description: 'Slow-cooked pork carnitas with habanero salsa.',
    price: 10.5,
    category: 'main',
    tags: ['spicy', 'mexican'],
    image:
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'salad-garden',
    name: 'Garden Crunch Salad',
    description: 'Shaved fennel, cucumber ribbons, citrus vinaigrette, and toasted seeds.',
    price: 8.75,
    category: 'starter',
    tags: ['vegetarian', 'fresh'],
    image:
      'https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'starter-tapas',
    name: 'Sunset Tapas Board',
    description: 'Chef selection of bites with marinated olives, toasted breads, and dips.',
    price: 12.5,
    category: 'starter',
    tags: ['shareable', 'chef selection'],
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'starter-soup',
    name: 'Roasted Tomato Soup',
    description: 'Silky roasted tomato soup with garlic confit and herb creme.',
    price: 6.95,
    category: 'starter',
    tags: ['comfort', 'warm'],
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'starter-tartine',
    name: 'Avocado Citrus Tartine',
    description: 'Sourdough tartine with smashed avocado, radish, and citrus salt.',
    price: 8.5,
    category: 'starter',
    tags: ['vegetarian', 'fresh'],
    image:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'soda-yuzu',
    name: 'Sparkling Yuzu Soda',
    description: 'Bright yuzu citrus with a hint of basil.',
    price: 4.5,
    category: 'drink',
    tags: ['non-alcoholic', 'citrus'],
    image:
      'https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'drink-matcha',
    name: 'Iced Matcha Latte',
    description: 'Ceremonial matcha shaken with oat milk and vanilla.',
    price: 5.75,
    category: 'drink',
    tags: ['caffeinated', 'creamy'],
    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'drink-berry-spritz',
    name: 'Berry Citrus Spritz',
    description: 'Sparkling berry shrub with orange twist.',
    price: 5.25,
    category: 'drink',
    tags: ['non-alcoholic', 'refreshing'],
    image:
      'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dessert-churros',
    name: 'Cinnamon Churro Bites',
    description: 'Warm churros tossed in cinnamon sugar with chocolate dip.',
    price: 6.25,
    category: 'dessert',
    tags: ['sweet', 'shareable'],
    image:
      'https://images.unsplash.com/photo-1527515545081-5db817172677?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'starter-crispy-cauliflower',
    name: 'Crispy Cauliflower Clouds',
    description: 'Tempura cauliflower with miso-lime glaze and scallions.',
    price: 9.25,
    category: 'starter',
    tags: ['vegetarian', 'crispy'],
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'main-lobster-risotto',
    name: 'Lobster Saffron Risotto',
    description: 'Creamy carnaroli rice, poached lobster, and citrus gremolata.',
    price: 24.5,
    category: 'main',
    tags: ['seafood', 'signature'],
    image:
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'main-ramen',
    name: 'Midnight Miso Ramen',
    description: 'Slow-braised pork, black garlic oil, and ajitama egg.',
    price: 15.75,
    category: 'main',
    tags: ['savory', 'noodles'],
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'main-steak',
    name: 'Peppercorn Ribeye',
    description: 'Charred ribeye with cracked pepper butter and herb jus.',
    price: 26.5,
    category: 'main',
    tags: ['meat', 'signature'],
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'main-pizza',
    name: 'Black Truffle Pizza',
    description: 'Thin crust pizza with truffle crema, mozzarella, and wild mushrooms.',
    price: 18.5,
    category: 'main',
    tags: ['vegetarian', 'italian'],
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'main-salmon',
    name: 'Miso Glazed Salmon',
    description: 'Atlantic salmon with charred broccolini and ginger rice.',
    price: 21.25,
    category: 'main',
    tags: ['seafood', 'light'],
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'main-pasta',
    name: 'Forest Mushroom Pasta',
    description: 'Tagliatelle with roasted mushrooms, parmesan, and thyme.',
    price: 16.25,
    category: 'main',
    tags: ['vegetarian', 'comfort food'],
    image:
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'drink-coldbrew',
    name: 'Nitro Cold Brew',
    description: 'Velvety cold brew with a cacao finish.',
    price: 5.5,
    category: 'drink',
    tags: ['caffeinated', 'signature'],
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dessert-mochi',
    name: 'Matcha Mochi Trio',
    description: 'Green tea ice cream with chewy mochi shells.',
    price: 7.5,
    category: 'dessert',
    tags: ['sweet', 'japanese'],
    image:
      'https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dessert-cheesecake',
    name: 'Salted Caramel Cheesecake',
    description: 'Creamy cheesecake with caramel glaze and cacao nibs.',
    price: 8.25,
    category: 'dessert',
    tags: ['sweet', 'rich'],
    image:
      'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=800&q=80'
  }
];
