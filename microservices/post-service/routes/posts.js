const multer = require('multer');
const storage = multer.memoryStorage();
const fileUpload = multer({ storage: storage });
const router = require('express').Router();
const Post = require('../model/post'); // Assuming you have a Mongoose Post model
const Minio = require('minio');
const axios = require('axios');
require('dotenv').config();

const minioClient = new Minio.Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: 'YX5NGYgypBTlyrbEblEP',
  secretKey: '1vgq3N5OvK5pMHUiMUfWAbB491u80DEMKabYxrbP'
});

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const policy =
`{
  "Version":"2012-10-17",
    "Statement":
    [
      {
        "Effect":"Allow",
        "Principal":{"AWS":["*"]},
        "Action":["s3:GetObject"],
        "Resource":["arn:aws:s3:::linkedin-mini/*"]
      }
    ]
}`;

router.route('/').get(async (req, res) => {
  try {
    const { userId } = req.query;
    let posts;

    if (userId && typeof userId === 'string') {
      console.log('finding posts for user: ' + userId);
      posts = await Post.find({ userId })
        .sort({ createdAt: 'desc' })
        .exec();
      console.log('posts found for user: ' + userId);
    } else {
      console.log('finding all posts...');
      posts = await Post.find()
        .sort({ createdAt: 'desc' })
        .exec();
      console.log('all posts found');
    }

    res.json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route('/').post(async (req, res) => {
  const { userId, body, name } = req.body;
  let post;

  try {
    console.log("creating post...")
    post = await Post.create({
      body,
      userId,
    });
    console.log("post created")

    const notification = "New post from " + name;

    // console.log("creating notification...")
    // const notificationData = await axios.post('http://localhost/notification/create', {
    //   userId: userId,
    //   postId: post._id,
    //   notification: notification
    // }).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    // });
    // console.log("notification created")

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.route('/upload/').post(fileUpload.single('image'), async (req, res) => {
  console.log('in upload post route...')

  const body = req.body.body;
  const userId = req.body.userId;
  const image = req.file;
  const name = req.body.name;

  let post;

  try {
    const imageName = image.originalname;
    const metaData = {
      'Content-Type': image.mimetype,
    };

    // console.log(minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + 'linkedin-mini' + '/' + imageName)
    // // check if bucket exists, otherwise create bucket
    // console.log('checking if bucket exists...');
    // minioClient.listBuckets((err, buckets) => {
    //   if (err) {
    //     console.error('Error listing buckets:', err);
    //     return;
    //   }
    // });
    
    // const found = buckets.some(bucket => bucket.name === bucketName);
  
    // console.log('bucket checking done...');
    // if (!found) {
    //   console.log('bucket not found, creating bucket...');
    //   await minioClient
    //   .makeBucket('linkedin-mini', "us-east-1")
    //   .then(() => {
    //     minioClient.setBucketPolicy('linkedin-mini', policy, function (err) {
    //       if (err) return console.log("Error setting bucket policy.", err);
    //       console.log("Bucket policy set to allow public access.");
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("Error creating bucket.", err);
    //   });
    //   console.log('bucket created');
    // }
    // console.log('bucket exists');
    
    console.log('uploading image to minio...');
    const uploadInfo = await minioClient.putObject('linkedin-mini', imageName, image.buffer, metaData);
    console.log('image uploaded to minio');

    const imageURL = "http://localhost:9000/linkedin-mini/" + imageName;
    console.log('image url: ' + imageURL);

    console.log('creating post...');
    post = new Post({
      body: body,
      image: imageURL,
      userId: userId,
    });
    post = await post.save();
    console.log('post created');

    // const user = await User.findOne({ _id: userId }).exec();
    // const user = await axios.get('http://localhost:5001/users/', {userId});

    const notification = "New post from " + name;

    console.log('creating notification...');
    const notificationData = await axios.post('http://localhost/notification/create', {
      userId: userId,
      postId: post._id,
      notification: notification
    });
    console.log('notification created');

    res.json(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
