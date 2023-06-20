export const up = async (knex) => {
  await knex.schema.createTable('notes', (table) => {
    table.increments('id')
    table.text('title')
    table.text('description')
    table.integer('user_id').references('id').inTable('users')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable('notes')
}
