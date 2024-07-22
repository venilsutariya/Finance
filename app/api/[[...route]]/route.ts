import { Hono } from "hono";
import { handle } from "hono/vercel";
import { string, z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app
  .get("/hello", (c) => {
    return c.json({
      message: "Hello Next.js!",
    });
  })
  .get(
    "/hello/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    (c) => {
      const { id } = c.req.valid("param");

      return c.json({
        message: "Hello Next.js!",
        id,
      });
    }
  )
  .post(
    "/create/:postId",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        userId: z.number(),
      })
    ),
    zValidator(
      "param",
      z.object({
        postId: z.number(),
      })
    ),
    (c) => {
      const { name, userId } = c.req.valid("json");
      const { postId } = c.req.valid("param");

      return c.json({});
    }
  );

export const GET = handle(app);
export const POST = handle(app);
