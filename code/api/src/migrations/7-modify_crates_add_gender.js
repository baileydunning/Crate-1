'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('crates', 'gender', {
      allowNull: true,
      type: Sequelize.INTEGER
    }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('crates', 'gender');
  }
};
