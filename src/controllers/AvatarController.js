import knex from "../database/knex/index.js"
import { DiskStorage } from "../providers/DiskStorage.js"
import { AppError } from "../utils/AppError.js"

export class AvatarController {
  async update(req, res) {
    const user_id = req.user.id
    const avatar = req.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("only authorized users can update avatar", 404)
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatar)
    user.avatar = filename

    await knex("users").where({ id: user_id }).update(user)

    return res.json(user)
  }
}
