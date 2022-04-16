const {
    user
} = require('../../models')

exports.getProfile = async (req, res) => {
    try {
        const profile = await user.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['email', 'name']
        })
        res.send({
            data: {
                profile
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Server Error'
        })
    }
}

exports.updateProfile = async (req, res) => {
    console.log('tes');
    try {
        await user.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        res.send({
            message: 'Profile updated successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Server Error'
        })
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        await user.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            message: 'Profile deleted successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Server Error'
        })
    }
}