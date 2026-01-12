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
      'https://images.unsplash.com/photo-1630852009278-6cc36322ddfc?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxDbGFzc2ljJTIwQ2hlZXNlYnVyZ2VyJTIwUXVhcnRlciUyMHBvdW5kZXIlMjBiZWVmJTIwcGF0dHklMjB3aXRoJTIwY2hlZGRhciUyQyUyMGxldHR1Y2UlMkMlMjB0b21hdG8lMkMlMjBhbmQlMjBob3VzZSUyMHNhdWNlLnxlbnwwfDB8fHwxNzY4MjI4NzU2fDA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'taco-spicy',
    name: 'Diablo Tacos (3pcs)',
    description: 'Slow-cooked pork carnitas with habanero salsa.',
    price: 10.5,
    category: 'main',
    tags: ['spicy', 'mexican'],
    image:
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHx0YWNvc3xlbnwwfDB8fHwxNzY4MjI4ODIxfDA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'salad-garden',
    name: 'Garden Crunch Salad',
    description: 'Shaved fennel, cucumber ribbons, citrus vinaigrette, and toasted seeds.',
    price: 8.75,
    category: 'starter',
    tags: ['vegetarian', 'fresh'],
    image:
      'https://images.unsplash.com/photo-1651384251745-75413ad7a4c1?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxHYXJkZW4lMjBDcnVuY2glMjBTYWxhZCUyMFNoYXZlZCUyMGZlbm5lbCUyQyUyMGN1Y3VtYmVyJTIwcmliYm9ucyUyQyUyMGNpdHJ1cyUyMHZpbmFpZ3JldHRlJTJDJTIwYW5kJTIwdG9hc3RlZCUyMHNlZWRzLnxlbnwwfDB8fHwxNzY4MjI4NzU5fDA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'starter-tapas',
    name: 'Sunset Tapas Board',
    description: 'Chef selection of bites with marinated olives, toasted breads, and dips.',
    price: 12.5,
    category: 'starter',
    tags: ['shareable', 'chef selection'],
    image:
      'https://images.unsplash.com/photo-1618681462303-7a8bfebfdcca?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxTdW5zZXQlMjBUYXBhcyUyMEJvYXJkJTIwQ2hlZiUyMHNlbGVjdGlvbiUyMG9mJTIwYml0ZXMlMjB3aXRoJTIwbWFyaW5hdGVkJTIwb2xpdmVzJTJDJTIwdG9hc3RlZCUyMGJyZWFkcyUyQyUyMGFuZCUyMGRpcHMufGVufDB8MHx8fDE3NjgyMjg3NjB8MA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'starter-fries-classic',
    name: 'Classic Sea Salt Fries',
    description: 'Crisp fries tossed with sea salt and cracked pepper.',
    price: 4.75,
    category: 'starter',
    tags: ['comfort food', 'shareable'],
    image:
      'https://images.unsplash.com/photo-1687573974556-60ee7b27b2ee?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxDbGFzc2ljJTIwU2VhJTIwU2FsdCUyMEZyaWVzJTIwQ3Jpc3AlMjBmcmllcyUyMHRvc3NlZCUyMHdpdGglMjBzZWElMjBzYWx0JTIwYW5kJTIwY3JhY2tlZCUyMHBlcHBlci58ZW58MHwwfHx8MTc2ODIyODc2MHww&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'starter-fries-truffle',
    name: 'Truffle Parmesan Fries',
    description: 'Golden fries with truffle oil, parmesan, and chives.',
    price: 6.5,
    category: 'starter',
    tags: ['signature', 'savory'],
    image:
      'https://images.unsplash.com/photo-1619158411623-f6e5b94bef0e?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxUcnVmZmxlJTIwUGFybWVzYW4lMjBGcmllcyUyMEdvbGRlbiUyMGZyaWVzJTIwd2l0aCUyMHRydWZmbGUlMjBvaWwlMkMlMjBwYXJtZXNhbiUyQyUyMGFuZCUyMGNoaXZlcy58ZW58MHwwfHx8MTc2ODIyODc2MHww&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'starter-fries-spicy',
    name: 'Smoky Chili Fries',
    description: 'Fries dusted with smoked paprika and chili-lime salt.',
    price: 5.5,
    category: 'starter',
    tags: ['spicy', 'shareable'],
    image:
      'https://images.unsplash.com/photo-1661081090290-9b66fd49d882?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxTbW9reSUyMENoaWxpJTIwRnJpZXMlMjBGcmllcyUyMGR1c3RlZCUyMHdpdGglMjBzbW9rZWQlMjBwYXByaWthJTIwYW5kJTIwY2hpbGktbGltZSUyMHNhbHQufGVufDB8MHx8fDE3NjgyMjg3NjJ8MA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'starter-soup',
    name: 'Roasted Tomato Soup',
    description: 'Silky roasted tomato soup with garlic confit and herb creme.',
    price: 6.95,
    category: 'starter',
    tags: ['comfort', 'warm'],
    image:
      'https://images.unsplash.com/photo-1695960682129-d35477676196?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxSb2FzdGVkJTIwVG9tYXRvJTIwU291cCUyMFNpbGt5JTIwcm9hc3RlZCUyMHRvbWF0byUyMHNvdXAlMjB3aXRoJTIwZ2FybGljJTIwY29uZml0JTIwYW5kJTIwaGVyYiUyMGNyZW1lLnxlbnwwfDB8fHwxNzY4MjI4NzYzfDA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'starter-tartine',
    name: 'Avocado Citrus Tartine',
    description: 'Sourdough tartine with smashed avocado, radish, and citrus salt.',
    price: 8.5,
    category: 'starter',
    tags: ['vegetarian', 'fresh'],
    image:
      'https://images.unsplash.com/photo-1672062519430-57b30e5e937d?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxBdm9jYWRvJTIwQ2l0cnVzJTIwVGFydGluZSUyMFNvdXJkb3VnaCUyMHRhcnRpbmUlMjB3aXRoJTIwc21hc2hlZCUyMGF2b2NhZG8lMkMlMjByYWRpc2glMkMlMjBhbmQlMjBjaXRydXMlMjBzYWx0LnxlbnwwfDB8fHwxNzY4MjI4NzY0fDA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'soda-yuzu',
    name: 'Sparkling Yuzu Soda',
    description: 'Bright yuzu citrus with a hint of basil.',
    price: 4.5,
    category: 'drink',
    tags: ['non-alcoholic', 'citrus'],
    image:
      'https://images.unsplash.com/photo-1733133113826-8b0b112f64d5?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxTcGFya2xpbmclMjBZdXp1JTIwU29kYSUyMEJyaWdodCUyMHl1enUlMjBjaXRydXMlMjB3aXRoJTIwYSUyMGhpbnQlMjBvZiUyMGJhc2lsLnxlbnwwfDB8fHwxNzY4MjI4NzY1fDA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'soda-cola',
    name: 'Classic Cola',
    description: 'Chilled cola with a fresh lime wedge.',
    price: 3.75,
    category: 'drink',
    tags: ['non-alcoholic', 'classic'],
    image:
      'https://images.unsplash.com/photo-1652762328770-b8ebdf23c58a?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxDbGFzc2ljJTIwQ29sYSUyMENoaWxsZWQlMjBjb2xhJTIwd2l0aCUyMGElMjBmcmVzaCUyMGxpbWUlMjB3ZWRnZS58ZW58MHwwfHx8MTc2ODIyODc2NXww&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'soda-orange',
    name: 'Blood Orange Soda',
    description: 'Bitter-sweet orange fizz over ice.',
    price: 4.25,
    category: 'drink',
    tags: ['non-alcoholic', 'citrus'],
    image:
      'https://images.unsplash.com/photo-1638389978802-1519896881b1?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxCbG9vZCUyME9yYW5nZSUyMFNvZGElMjBCaXR0ZXItc3dlZXQlMjBvcmFuZ2UlMjBmaXp6JTIwb3ZlciUyMGljZS58ZW58MHwwfHx8MTc2ODIyODc2N3ww&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'soda-ginger',
    name: 'Ginger Lime Soda',
    description: 'Spicy ginger fizz with a splash of lime.',
    price: 4.0,
    category: 'drink',
    tags: ['non-alcoholic', 'spicy'],
    image:
      'https://images.unsplash.com/photo-1625860448256-142933059c77?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxHaW5nZXIlMjBMaW1lJTIwU29kYSUyMFNwaWN5JTIwZ2luZ2VyJTIwZml6eiUyMHdpdGglMjBhJTIwc3BsYXNoJTIwb2YlMjBsaW1lLnxlbnwwfDB8fHwxNzY4MjI4NzY4fDA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'drink-matcha',
    name: 'Iced Matcha Latte',
    description: 'Ceremonial matcha shaken with oat milk and vanilla.',
    price: 5.75,
    category: 'drink',
    tags: ['caffeinated', 'creamy'],
    image:
      'https://images.unsplash.com/photo-1724198218218-fccf39a4a809?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxJY2VkJTIwTWF0Y2hhJTIwTGF0dGUlMjBDZXJlbW9uaWFsJTIwbWF0Y2hhJTIwc2hha2VuJTIwd2l0aCUyMG9hdCUyMG1pbGslMjBhbmQlMjB2YW5pbGxhLnxlbnwwfDB8fHwxNzY4MjI4NzY4fDA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'drink-berry-spritz',
    name: 'Berry Citrus Spritz',
    description: 'Sparkling berry shrub with orange twist.',
    price: 5.25,
    category: 'drink',
    tags: ['non-alcoholic', 'refreshing'],
    image:
      'https://images.unsplash.com/photo-1708387255269-2d459efd9715?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxCZXJyeSUyMENpdHJ1cyUyMFNwcml0eiUyMFNwYXJrbGluZyUyMGJlcnJ5JTIwc2hydWIlMjB3aXRoJTIwb3JhbmdlJTIwdHdpc3QufGVufDB8MHx8fDE3NjgyMjg3Njl8MA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'dessert-churros',
    name: 'Cinnamon Churro Bites',
    description: 'Warm churros tossed in cinnamon sugar with chocolate dip.',
    price: 6.25,
    category: 'dessert',
    tags: ['sweet', 'shareable'],
    image:
      'https://images.unsplash.com/photo-1478013380807-2e936ede2599?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxDaW5uYW1vbiUyMENodXJybyUyMEJpdGVzJTIwV2FybSUyMGNodXJyb3MlMjB0b3NzZWQlMjBpbiUyMGNpbm5hbW9uJTIwc3VnYXIlMjB3aXRoJTIwY2hvY29sYXRlJTIwZGlwLnxlbnwwfDB8fHwxNzY4MjI4NzY5fDA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'starter-crispy-cauliflower',
    name: 'Crispy Cauliflower Clouds',
    description: 'Tempura cauliflower with miso-lime glaze and scallions.',
    price: 9.25,
    category: 'starter',
    tags: ['vegetarian', 'crispy'],
    image:
      'https://images.unsplash.com/photo-1584696145968-908ff8c50118?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxDcmlzcHklMjBDYXVsaWZsb3dlciUyMENsb3VkcyUyMFRlbXB1cmElMjBjYXVsaWZsb3dlciUyMHdpdGglMjBtaXNvLWxpbWUlMjBnbGF6ZSUyMGFuZCUyMHNjYWxsaW9ucy58ZW58MHwwfHx8MTc2ODIyODc2OXww&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'main-lobster-risotto',
    name: 'Lobster Saffron Risotto',
    description: 'Creamy carnaroli rice, poached lobster, and citrus gremolata.',
    price: 24.5,
    category: 'main',
    tags: ['seafood', 'signature'],
    image:
      'https://images.unsplash.com/photo-1711989874707-6a5ffe1798c5?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxMb2JzdGVyJTIwU2FmZnJvbiUyMFJpc290dG8lMjBDcmVhbXklMjBjYXJuYXJvbGklMjByaWNlJTJDJTIwcG9hY2hlZCUyMGxvYnN0ZXIlMkMlMjBhbmQlMjBjaXRydXMlMjBncmVtb2xhdGEufGVufDB8MHx8fDE3NjgyMjg3NzB8MA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'main-ramen',
    name: 'Midnight Miso Ramen',
    description: 'Slow-braised pork, black garlic oil, and ajitama egg.',
    price: 15.75,
    category: 'main',
    tags: ['savory', 'noodles'],
    image:
      'https://images.unsplash.com/photo-1598230787316-5511178d6f58?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxNaWRuaWdodCUyME1pc28lMjBSYW1lbiUyMFNsb3ctYnJhaXNlZCUyMHBvcmslMkMlMjBibGFjayUyMGdhcmxpYyUyMG9pbCUyQyUyMGFuZCUyMGFqaXRhbWElMjBlZ2cufGVufDB8MHx8fDE3NjgyMjg3NzB8MA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'main-steak',
    name: 'Peppercorn Ribeye',
    description: 'Charred ribeye with cracked pepper butter and herb jus.',
    price: 26.5,
    category: 'main',
    tags: ['meat', 'signature'],
    image:
      'https://images.unsplash.com/photo-1741518165765-af1c27e6795e?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxQZXBwZXJjb3JuJTIwUmliZXllJTIwQ2hhcnJlZCUyMHJpYmV5ZSUyMHdpdGglMjBjcmFja2VkJTIwcGVwcGVyJTIwYnV0dGVyJTIwYW5kJTIwaGVyYiUyMGp1cy58ZW58MHwwfHx8MTc2ODIyODc3Mnww&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'main-pizza',
    name: 'Black Truffle Pizza',
    description: 'Thin crust pizza with truffle crema, mozzarella, and wild mushrooms.',
    price: 18.5,
    category: 'main',
    tags: ['vegetarian', 'italian'],
    image:
      'https://images.unsplash.com/photo-1730372801496-be4af356e214?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxCbGFjayUyMFRydWZmbGUlMjBQaXp6YSUyMFRoaW4lMjBjcnVzdCUyMHBpenphJTIwd2l0aCUyMHRydWZmbGUlMjBjcmVtYSUyQyUyMG1venphcmVsbGElMkMlMjBhbmQlMjB3aWxkJTIwbXVzaHJvb21zLnxlbnwwfDB8fHwxNzY4MjI4NzcyfDA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'main-salmon',
    name: 'Miso Glazed Salmon',
    description: 'Atlantic salmon with charred broccolini and ginger rice.',
    price: 21.25,
    category: 'main',
    tags: ['seafood', 'light'],
    image:
      'https://images.unsplash.com/photo-1759271082074-6cde09f86550?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxNaXNvJTIwR2xhemVkJTIwU2FsbW9uJTIwQXRsYW50aWMlMjBzYWxtb24lMjB3aXRoJTIwY2hhcnJlZCUyMGJyb2Njb2xpbmklMjBhbmQlMjBnaW5nZXIlMjByaWNlLnxlbnwwfDB8fHwxNzY4MjI4NzczfDA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'main-pasta',
    name: 'Forest Mushroom Pasta',
    description: 'Tagliatelle with roasted mushrooms, parmesan, and thyme.',
    price: 16.25,
    category: 'main',
    tags: ['vegetarian', 'comfort food'],
    image:
      'https://images.unsplash.com/photo-1617237692625-36ecc1173a4d?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxGb3Jlc3QlMjBNdXNocm9vbSUyMFBhc3RhJTIwVGFnbGlhdGVsbGUlMjB3aXRoJTIwcm9hc3RlZCUyMG11c2hyb29tcyUyQyUyMHBhcm1lc2FuJTJDJTIwYW5kJTIwdGh5bWUufGVufDB8MHx8fDE3NjgyMjg3NzN8MA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'drink-coldbrew',
    name: 'Nitro Cold Brew',
    description: 'Velvety cold brew with a cacao finish.',
    price: 5.5,
    category: 'drink',
    tags: ['caffeinated', 'signature'],
    image:
      'https://images.unsplash.com/photo-1617397300623-2d81b1f97f1b?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxOaXRybyUyMENvbGQlMjBCcmV3JTIwVmVsdmV0eSUyMGNvbGQlMjBicmV3JTIwd2l0aCUyMGElMjBjYWNhbyUyMGZpbmlzaC58ZW58MHwwfHx8MTc2ODIyODc3NHww&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'dessert-mochi',
    name: 'Matcha Mochi Trio',
    description: 'Green tea ice cream with chewy mochi shells.',
    price: 7.5,
    category: 'dessert',
    tags: ['sweet', 'japanese'],
    image:
      'https://images.unsplash.com/photo-1706350091276-ba994c35cd99?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxNYXRjaGElMjBNb2NoaSUyMFRyaW8lMjBHcmVlbiUyMHRlYSUyMGljZSUyMGNyZWFtJTIwd2l0aCUyMGNoZXd5JTIwbW9jaGklMjBzaGVsbHMufGVufDB8MHx8fDE3NjgyMjg3NzV8MA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'dessert-cheesecake',
    name: 'Salted Caramel Cheesecake',
    description: 'Creamy cheesecake with caramel glaze and cacao nibs.',
    price: 8.25,
    category: 'dessert',
    tags: ['sweet', 'rich'],
    image:
      'https://images.unsplash.com/photo-1726514735659-156f5c5139db?ixid=M3w4NTYzMDV8MHwxfHNlYXJjaHwxfHxTYWx0ZWQlMjBDYXJhbWVsJTIwQ2hlZXNlY2FrZSUyMENyZWFteSUyMGNoZWVzZWNha2UlMjB3aXRoJTIwY2FyYW1lbCUyMGdsYXplJTIwYW5kJTIwY2FjYW8lMjBuaWJzLnxlbnwwfDB8fHwxNzY4MjI4Nzc1fDA&ixlib=rb-4.1.0&w=800&auto=format&fit=crop&q=80'
  }
];
