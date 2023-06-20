export const up = async (knex) => {
  await knex.schema.createTable('links', (table) => {
    table.increments('id')
    table.text('url').notNullable()

    table.integer('note_id').references('id').inTable('users').onDelete('CASCADE')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable('links')
}
