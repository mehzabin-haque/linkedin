const multer = require('multer');
const storage = multer.memoryStorage();
const fileUpload = multer({ storage: storage });
const router = require('express').Router();
const Post = require('../model/post'); // Assuming you have a Mongoose Post model
const Minio = require('minio');
require('dotenv').config();

const minioClient = new Minio.Client({
  endPoint: 'play.min.io',
  port: 9000,
  useSSL: true,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: process.env.MINIO_SECRET,
});

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

router.route('/').get(async (req, res) => {
  try {
    const { userId } = req.query;
    let posts;

    if (userId && typeof userId === 'string') {
      posts = await Post.find({ userId })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .exec();
    } else {
      posts = await Post.find({})
        .populate('user')
        .sort({ createdAt: 'desc' })
        .exec();
    }

    console.log('joadvbjdkbvdhjkvbdv');

    res.json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route('/').post(async (req, res) => {
  const { userId, body } = req.body;
  let post;

  try {
    post = new Post({
      body,
      userId,
    });
    post = await post.save();

    const user = await User.findOne({ _id: userId }).exec();

    const notification = "New post from " + user.name;

    // const notificationData = await axios.post('http://localhost/notify/', {
    //   userId: userId,
    //   postId: post._id,
    //   notification: notification
    // });

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.route('/upload/').post(fileUpload.single('image'), async (req, res) => {
  const body = req.body.body;
  const userId = req.body.userId;
  const image = req.file;

  let post;

  try {
    const imageName = image.originalname;
    const metaData = {
      'Content-Type': image.mimetype,
    };

    const uploadInfo = await minioClient.putObject('linkedin-mini', imageName, image.buffer, metaData);

    const imageURL = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + 'linkedin-mini' + '/' + imageName;

    post = new Post({
      body: body,
      image: imageURL,
      userId: userId,
    });
    post = await post.save();

    const user = await User.findOne({ _id: userId }).exec();

    const notification = "New post from " + user.name;

    // const notificationData = await axios.post('http://localhost/notify/', {
    //   userId: userId,
    //   postId: post._id,
    //   notification: notification
    // });

    res.json(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
