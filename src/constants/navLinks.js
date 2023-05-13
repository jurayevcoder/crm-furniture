export const navLinks = [
  {
    id: 1,
    title: 'Dashboard',
    link: '/',
    icon: 'bx bxs-dashboard',
    type: ['ADMIN', 'SUPER-ADMIN', "OPERATOR", 'DELIVERYMAN']
  },
  {
    id: 2,
    title: 'Xodimlar',
    link: '/employee',
    icon: 'bx bxs-user-plus',
    type: ['SUPER-ADMIN']
  },
  {
    id: 9,
    title: 'Mahsulot turi',
    link: '/types',
    icon: 'bx bxs-layer-plus',
    type: ['ADMIN', 'SUPER-ADMIN']
  },
  {
    id: 8,
    title: 'Mahsulotlar',
    link: '/product',
    icon: 'bx bxs-basket',
    type: ['ADMIN', 'SUPER-ADMIN']
  },
  {
    id: 6,
    title: 'Kontaktlar',
    link: '/contact',
    icon: 'bx bxs-contact',
    type: ['SUPER-ADMIN', "OPERATOR"]
  },
  {
    id: 3,
    title: 'Buyurtmalar',
    link: '/order',
    icon: 'bx bxs-store-alt',
    type: ['ADMIN', 'SUPER-ADMIN', "OPERATOR"],
  },
  {
    id: 4,
    title: 'Yangi buyurtma',
    link: '/order',
    icon: 'bx bxs-cart-add',
    type: ['ADMIN', 'SUPER-ADMIN', "OPERATOR"]
  },
  {
    id: 7,
    title: 'Viloyatlar',
    link: '/region',
    icon: 'bx bxs-map',
    type: ['ADMIN', 'SUPER-ADMIN']
  },
  {
    id: 5,
    title: 'Sozlanmalar',
    link: '/settings',
    icon: 'bx bx-cog',
    type: ['ADMIN', 'SUPER-ADMIN', "OPERATOR", 'DELIVERYMAN']
  }
]
