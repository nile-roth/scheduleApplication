// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './routes/tasks.db3'
    },
    migrations: {
      directory: './routes/migrations'
    },
    seeds: {
      directory: './routes/seeds'
    },
    useNullAsDefault: true,
  }

};
