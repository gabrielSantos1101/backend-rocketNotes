export const up = async (knex) => {
  await knex.schema.createTable('tags', (table) => {
    table.increments('id')
    table.text('name').notNullable()

    table.integer('note_id').references('id').inTable('notes').onDelete('CASCADE')
    table.integer('user_id').references('id').inTable('users')
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable('tags')
}
