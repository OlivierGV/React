/**
 * Express router paths go here.
 */


export default {
  Base: '/',
  Personnages: {
    Base: '/personnages',
    GetAll: '/',
    GetOne: '/:id',
    GetByNiveau: '/niveau/:niveau',
    orderByDate: '/date/:ordre',
    Add: '/',
    Update: '/',
    Delete: '/:id',
  },
} as const;
