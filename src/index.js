import bodyParser from "body-parser";
import express from "express";
import { bot } from "./bot";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle the POST request
app.post("/add-sub", (req, res) => {
  const urlFromClient = req.body.url;

  // Process the URL or perform any kind of task
  // For this example, we just log it to the console
  console.log(`Received URL: ${urlFromClient}`);

  // Respond to the client
  res
    .status(200)
    .json({ message: "URL received successfully", url: urlFromClient });
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server running at http://localhost:${process.env.PORT || 3000}/`
  );
});

bot.launch();

// const user = await getUser("art_print_you");

// const posts = parseUser(user.data.user);

// const postsWithComments = [];

// await Promise.all(
//   posts.images.map(async (i) => {
//     const postData = await getPost(i.shortcode);
//     const post = parsePost(postData.data["shortcode_media"]);

//     if (!post.comments.length) return;

//     postsWithComments.push(post);
//   })
// );

// console.log(postsWithComments);
