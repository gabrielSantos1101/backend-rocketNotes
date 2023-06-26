/* eslint-disable camelcase */
import knex from '../database/knex/index.js'

export class TagsController {
  async index (req, res) {
    const { user_id } = req.params

    const tags = await knex('tags').where({ user_id })

    return res.json(tags)
  }
}
