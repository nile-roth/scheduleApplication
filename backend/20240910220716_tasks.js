exports.up = async knex => {
  await knex.schema.createTable('tasks', tbl => {
    tbl.increments();
    tbl.text('taskTitle', 256).notNullable();
    tbl.date('taskDate').notNullable();
    tbl.time('taskTime').notNullable();
  })
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('tasks');
  };
