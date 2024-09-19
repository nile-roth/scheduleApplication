
exports.up = async knex => {
  await knex.schema.createTable('tasks', tbl => {
    tbl.increments();
    tbl.text('taskTitle', 256).notNullable();
  })
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('tasks');
  };
