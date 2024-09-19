/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
  .then( function () {
    return knex('tasks').insert([
    {
      taskTitle: "walk the dogs"
    },
    {
      taskTitle: "eat"
    },
    {
      taskTitle: "smoke"
    },
    {
      taskTitle: "sleep"
    }
  ]);
})};
