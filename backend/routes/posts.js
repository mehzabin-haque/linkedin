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

    res.json(posts)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.route('/').post(async (req, res) => {
  const { userId, body } = req.body
  // console.log(userId, body)

  let post

  try {
    post = await prisma.post.create({
      data: {
        body,
        userId: userId
      }
    })

    console.log(post)
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
  console.log('body: ' + body)
  // console.log(image)
  // console.log(userId, body)

  let post

  try {

    const imageName = image.image.name
    // console.log(image.image.name)
    // const imageURL = 'http://localhost:9000/linkedin-mini/' + imageName

    // minioClient.makeBucket('linkedin-mini', 'us-east-1', function (err) {
    //   if (err) return console.log(err)

    //   console.log('Bucket created successfully in "us-east-1".')


    // });

    const metaData = {
      'Content-Type': image.image.mimetype,
    }
    // Using fPutObject API upload your file to the bucket europetrip.
    const uploadInfo = await minioClient.putObject('linkedin-mini', imageName, image.image.data, metaData)
    

    // generate a valid URL for image
    // console.log(uploadInfo)
    const imageURL = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + 'linkedin-mini' + '/' + imageName

    post = await prisma.post.create({
      data: {
        body: body,
        image: imageURL,
        userId: userId
      }
    })


    console.log(post)
    res.json(post)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

module.exports = router