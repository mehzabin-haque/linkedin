const multer = require('multer')

const storage = multer.memoryStorage()
const fileUpload = multer({ storage: storage })

const router = require('express').Router()
const prisma = require('../db/prisma')
const Minio = require('minio')
require('dotenv').config()

const minioClient = new Minio.Client({
  endPoint: 'play.min.io',
  port: 9000,
  useSSL: true,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: process.env.MINIO_SECRET
});

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};


router.route('/').get(async (req, res) => {
  try {
    const { userId } = req.query
    let posts

    if (userId && typeof userId === 'string') {
      posts = await prisma.post.findMany({
        where: {
          userId
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc'
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }

    console.log('joadvbjdkbvdhjkvbdv')

    

    res.json(posts)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.route('/').post(async (req, res) => {
  const { userId, body } = req.body
  let post

  try {
    post = await prisma.post.create({
      data: {
        body,
        userId: userId
      }
    })

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    const notification = "New post from " + user.name

    // const notificationData = await axios.post('http://localhost/notify/', {
    //   userId: userId,
    //   postId: post.id,
    //   notification: notification
    // })

    res.json(post)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

router.route('/upload/', fileUpload.single('image')).post(async (req, res) => {
  // console.log(req.files)
  const body = req.body.body
  const userId = req.body.userId
  const image = req.files

  let post

  try {

    const imageName = image.image.name

    const metaData = {
      'Content-Type': image.image.mimetype,
    }
    // Using fPutObject API upload your file to the bucket europetrip.
    const uploadInfo = await minioClient.putObject('linkedin-mini', imageName, image.image.data, metaData)
    

    // generate a valid URL for image
    const imageURL = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + 'linkedin-mini' + '/' + imageName

    post = await prisma.post.create({
      data: {
        body: body,
        image: imageURL,
        userId: userId
      }
    })

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    const notification = "New post from " + user.name

    // const notificationData = await axios.post('http://localhost/notify/', {
    //   userId: userId,
    //   postId: post.id,
    //   notification: notification
    // })
    
    res.json(post)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router