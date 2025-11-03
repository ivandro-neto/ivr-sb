'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.query('CREATE DATABASE ivr_db_SB;');
    } catch (err) {
      console.warn('⚠️ Banco ivr_db_SB já existe ou não pôde ser criado.');
    }

    await queryInterface.sequelize.query('USE ivr_db_SB;');

    await queryInterface.createTable(
      { tableName: 'managers', schema: 'dbo' },
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('NEWID()'), // ✅ Gera automaticamente no SQL Server
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        gender: {
          type: Sequelize.ENUM('M', 'F'),
          allowNull: false
        },
        extension: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      },
      {
        timestamps: false
      }
    );

    await queryInterface.createTable(
      { tableName: 'customers', schema: 'dbo' },
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('NEWID()'), // ✅ Também aqui
          allowNull: false,
          primaryKey: true
        },
        phone_number: {
          type: Sequelize.STRING,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        gender: {
          type: Sequelize.ENUM('M', 'F'),
          allowNull: false
        },
        managerId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: { tableName: 'managers', schema: 'dbo' },
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
        }
      },
      {
        timestamps: false
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('USE ivr_db_SB;');
    await queryInterface.dropTable({ tableName: 'customers', schema: 'dbo' });
    await queryInterface.dropTable({ tableName: 'managers', schema: 'dbo' });

    try {
      await queryInterface.sequelize.query('DROP DATABASE ivr_db_SB;');
    } catch (err) {
      console.warn('⚠️ Não foi possível remover o banco ivr_db_SB.');
    }
  }
};
