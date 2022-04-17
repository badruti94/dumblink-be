const express = require('express')
const router = express.Router()

const {
    auth
} = require('../middleware/auth')
const {
    uploadFile,
    uploadFileUpdate
} = require('../middleware/uploadFile')

const {
    login,
    register
} = require('../controllers/auth')
const {
    getProfile,
    updateProfile,
    deleteProfile
} = require('../controllers/profie')
const {
    addLink,
    getLink,
    getLinks,
    deleteLink,
    countLink,
    getLinkByUniqid,
    updateLink
} = require('../controllers/link')

router.post('/login', login)
router.post('/register', register)

router.get('/profile', auth, getProfile)
router.put('/profile', auth, updateProfile)
router.delete('/profile', auth, deleteProfile)

router.post('/link', auth, uploadFile("photo"), addLink)
router.get('/link/:id', getLink)
router.get('/link-uniqid/:uniqid', getLinkByUniqid)
router.get('/link', auth, getLinks)
router.put('/link/:id', auth, uploadFileUpdate("photo"), updateLink)
router.delete('/link/:id', auth, deleteLink)
router.get('/link/:id/count', countLink)


module.exports = router