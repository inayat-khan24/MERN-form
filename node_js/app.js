import express from "express";
import cors from "cors";
import router from "./routes/form_routes.js";


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", router);



// Start server
app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000');
});
