import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().maxLength(255).email(),
    password: vine.string().minLength(6).maxLength(32),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255),
    email: vine.string().maxLength(255).email(),
    password: vine.string().minLength(6).maxLength(32).confirmed(),
  })
)
