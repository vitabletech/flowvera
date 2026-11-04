const express = require("express");
const path = require("node:path");

const app = express();
const port = Number(process.env.PORT) || 3000;
const exportDirectory = path.join(__dirname, "out");

app.use(express.static(exportDirectory));
app.use((req, res) => {
  res.status(404).sendFile(path.join(exportDirectory, "404.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`FlowVera is listening on port ${port}`);
});
