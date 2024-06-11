export const config = {
  runtime: "nodejs", // this is a pre-requisite
};

export default async function handle(req, res) {
  try {
    const urlFromClient = req.body.url;

    // Process the URL or perform any kind of task
    // For this example, we just log it to the console
    console.log(`Received URL: ${urlFromClient}`);

    // Respond to the client
    res
      .status(200)
      .json({ message: "URL received successfully", url: urlFromClient });
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Server Error</h1><p>Sorry, there was a problem</p>");
    console.error(e.message);
  }
}
