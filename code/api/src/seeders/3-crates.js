'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('crates', [
      {
        name: 'Clothes for Men',
        description: 'A monthly supply of trendy clothes for men.',
        gender: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clothes for Women',
        description: 'A monthly supply of trendy clothes for women.',
        gender: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Accessories for Men',
        description: 'A monthly supply of trendy accessories for men',
        gender: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Accessories for Women',
        description: 'A monthly supply of trendy accessories for women',
        gender: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clothes and Accessories for Men',
        description: 'A monthly supply of trendy clothes and accessories for men',
        gender: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clothes and Accessories for Women',
        description: 'A monthly supply of trendy clothes and accessories for women',
        gender: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('crates', null, {});
  }
}
