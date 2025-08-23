import express from "express";
import cors from "cors";
import authRouter from "./routes/auth"
import aiRouter from "./routes/ai"
import { billingRouter } from "./routes/billing"
import rzpWebhookRouter from "./routes/rzpWebhookRouter"

const app = express();
app.use(cors())

// Use raw body parser for webhook route to enable signature verification
app.use("/rzp_webhook", rzpWebhookRouter);

// Use JSON parser for all other routes
app.use(express.json());
app.use("/ai", aiRouter);
app.use("/auth", authRouter);
app.use("/billing", billingRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});