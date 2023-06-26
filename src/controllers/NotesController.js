import knex from '../database/knex/index.js'

/* eslint-disable camelcase */
export class NotesController {
  async create (req, res) {
    const { title, description, tags, links } = req.body
    const { user_id } = req.params

    // Insert note into database and get the ID of the new note
    const [note_id] = await knex('notes').insert({
      title,
      description,
      user_id
    })

    // Create array of link objects to insert into database
    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })
    await knex('links').insert(linksInsert)

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })
    await knex('tags').insert(tagsInsert)

    res.json()
  }

  async show (req, res) {
    const { id } = req.params
    // Retrieve the note with the given ID from the database.
    const note = await knex('notes').where({ id }).first()
    // Retrieve all the tags associated with the note and order them by name.
    const tags = await knex('tags').where({ note_id: id }).orderBy('name')
    // Retrieve all the links associated with the note and order them by creation date.
    const links = await knex('links').where({ note_id: id }).orderBy('created_at')

    return res.json({
      ...note,
      tags,
      links
    })
  }

  async delete (req, res) {
    const { id } = req.params

    // Delete the note with the given ID from the database.
    await knex('notes').where({ id }).delete()

    return res.json()
  }

  async index (req, res) {
    // extract query parameters
    const { title, user_id, tags } = req.query
    let notes

    if (tags) {
      const tagsFilter = tags.split(',').map(tag => tag.trim())

      notes = await knex('tags')
        .select([
          'notes.id',
          'notes.title',
          'notes.user_id'
        ])
        .where('notes.user_id', user_id)
        .whereLike('notes.title', `%${title}%`)
        .whereIn('name', tagsFilter)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .orderBy('notes.title')
    } else {
      // otherwise, filter notes by user_id and title
      notes = await knex('notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title')
    }

    // get all tags for user
    const userTags = await knex('tags').where({ user_id })
    // map each note to include its respective tags
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })

    return res.json(notesWithTags)
  }
}
