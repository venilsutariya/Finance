import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app
  .get("/hello", (c) => {
    return c.json({
      message: "Hello Next.js!",
    });
  })
  .get("/hello/:id", (c) => {
    const id = c.req.param("id");

    return c.json({
      message: "Hello Next.js!",
      id,
    });
  });

export const GET = handle(app);
export const POST = handle(app);
