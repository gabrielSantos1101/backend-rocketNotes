/* eslint-disable camelcase */
import knex from '../database/knex/index.js'

export class TagsController {
  // Get all tags for a given user id
  async index (req, res) {
    // Extract user id from request parameters
    const user_id = req.user.id

    // Query database for all tags associated with user id
    const tags = await knex('tags').where({ user_id })

    // Send JSON response with tags data
    return res.json(tags)
  }
}
