import express from "express";
import { getPost, getUser } from "./src/api.js";
import { parsePost, parseUser } from "./src/parse.js";

const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

app.post("/add-subscription", async (req, res) => {});

module.exports = app;

const user = await getUser("art_print_you");

const posts = parseUser(user.data.user);

const postsWithComments = [];

await Promise.all(
  posts.images.map(async (i) => {
    const postData = await getPost(i.shortcode);
    const post = parsePost(postData.data["shortcode_media"]);

    if (!post.comments.length) return;

    postsWithComments.push(post);
  })
);

console.log(postsWithComments);
