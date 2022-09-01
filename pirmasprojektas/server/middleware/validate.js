import Joi from 'joi'

const validate = (schema, req, res, next) => {
    const options = {
        abortEarly: true,
        stripUnknown: true
    }
    const {error, value} = schema.validate(req.body, options)
    
    let message = ''

    if(error) {
        switch(error.details[0].path[0]) {
            case 'first_name':
                message = 'Wrong first name'
                break
            case 'last_name': 
                message = 'Wrong last name'
                break
            case 'email': 
                message = 'Wrong e-mail'
                break
            case 'password':
                message = 'Wrong password'
                break
            case 'title':
                message = 'Field cannot be empty'
                break
            default:
                message = 'Incorrectly filled fields'
                break
        }

        return res.status(500).send(message)
    }

    req.body = value
    next()
}

export const postValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        content: Joi.string().allow(''),
        image: Joi.string().allow('')
    })

    validate(schema, req, res, next)
}

export const bookValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        author: Joi.string().min(5).max(255).required(),
        cover_author: Joi.string().min(5).max(255).required(),
        ISBN_code: Joi.string().min(10).max(13).required(),
        content: Joi.string().allow(''),
        image: Joi.string().allow('')
    })

    validate(schema, req, res, next)
}


export const registerValidator = (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(50).required(),
        last_name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(), 
        password: Joi.string().min(6).max(12).required()
    })

    validate(schema, req, res, next)
}

export const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(12).required()
    })

    validate(schema, req, res, next)
}

export default validate