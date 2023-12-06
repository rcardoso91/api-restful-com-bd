// knexfile.js
module.exports = {
    client: 'pg',
    connection: {
      host: 'dpg-clnsmdeqc21c73dvotl0-a',
      port: 5432,
      database: 'nodeapp_postgresql_instance',
      user: 'nodeapp_postgresql_instance_user',
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  };
  