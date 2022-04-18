const uniqid = require('uniqid')
const cloudinary = require('cloudinary').v2
const DatauriParser = require('datauri/parser')
const path = require('path')

const {
    link,
    user
} = require('../../models')


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const parser = new DatauriParser()

exports.addLink = async (req, res) => {
    const file = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer).content
    const result = await cloudinary.uploader.upload(file, {
        folder: 'uploads',
        use_filename: true,
        unique_filename: false
    })
    try {
        await link.create({
            ...req.body,
            userId: req.user.id,
            uniqid: uniqid.time(),
            photo: result.secure_url
        })
        res.send({
            message: 'Link created successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.updateLink = async (req, res) => {
    try {
        if (req.file) {
            req.body.photo = result.secure_url
        }
        await link.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.send({
            message: 'Link updated successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.getLink = async (req, res) => {
    try {
        const data = await link.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: user,
                as: 'user',
                attributes: ['email', 'name']
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.send({
            data: {
                link: data
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Server Error'
        })
    }
}
exports.getLinkByUniqid = async (req, res) => {
    try {
        const data = await link.findOne({
            where: {
                uniqid: req.params.uniqid
            },
            include: {
                model: user,
                as: 'user',
                attributes: ['email', 'name']
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.send({
            data: {
                link: data
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Server Error'
        })
    }
}

exports.getLinks = async (req, res) => {
    try {
        const links = await link.findAll({
            where: {
                userId: req.user.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            data: {
                links
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Server Error'
        })
    }
}

exports.deleteLink = async (req, res) => {
    try {
        await link.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            message: 'Link deleted successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Server Error'
        })
    }
}

exports.countLink = async (req, res) => {
    try {
        await link.increment({
            view: 1
        }, {
            where: {
                id: req.params.id
            }
        })

        res.send({
            message: 'Add 1 view to link'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Server Error'
        })
    }
}