import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Serve uploaded images from server/public/uploads
  const uploadsDir = path.resolve(import.meta.dirname, "..", "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use("/uploads", express.static(uploadsDir));

  // Endpoint to accept image uploads as data URLs and save to uploads folder
  app.post("/manus-upload", async (req, res) => {
    try {
      const { fileName, data } = req.body as { fileName?: string; data?: string };
      if (!data) return res.status(400).json({ error: "Missing data" });

      // data may be a data URL: data:<mime>;base64,<base64data>
      const matches = /^data:(.+);base64,(.+)$/.exec(data);
      let buffer: Buffer;
      let ext = "png";
      if (matches) {
        const mime = matches[1];
        const b64 = matches[2];
        buffer = Buffer.from(b64, "base64");
        const m = mime.split("/")[1];
        if (m) ext = m.split("+")[0];
      } else {
        // assume raw base64
        buffer = Buffer.from(data, "base64");
      }

      const safeName = (fileName || `img_${Date.now()}`).replace(/[^a-zA-Z0-9._-]/g, "_");
      const outName = `${Date.now()}_${safeName}`;
      const finalName = outName.endsWith(ext) ? outName : `${outName}.${ext}`;
      const outPath = path.join(uploadsDir, finalName);
      await fs.promises.writeFile(outPath, buffer);

      // Return a URL that the client can use to fetch the image
      const url = `/uploads/${finalName}`;
      res.json({ url });
    } catch (err) {
      console.error("/manus-upload error:", err);
      res.status(500).json({ error: "upload_failed" });
    }
  });
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
