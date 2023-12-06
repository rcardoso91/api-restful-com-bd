/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// 20211206120000_create_produto_table.js
exports.up = function (knex) {
    return knex.schema.createTable('produto', function (table) {
      table.increments('id').primary();
      table.string('descricao').notNullable();
      table.decimal('valor').notNullable();
      table.string('marca');
    })
    .then(() => {
      // Inserir dados na tabela após a criação
      return knex('produto').insert([
        { descricao: 'Arroz parboilizado 5Kg', valor: 25, marca: 'Tio João' },
        { descricao: 'Maionese 250gr', valor: 7.2, marca: 'Helmanns' },
        { descricao: 'Iogurte Natural 200ml', valor: 2.5, marca: 'Itambé' },
        // Adicione mais inserts conforme necessário
      ]);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('produto');
  };
  
  

