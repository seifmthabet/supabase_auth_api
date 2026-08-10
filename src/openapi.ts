export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Supabase Auth API",
    version: "1.0.0",
    description:
      "Interactive API documentation for the Supabase auth routes. Use the Authorize button to paste a JWT once and reuse it for protected endpoints.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/api/auth/signup": {
      post: {
        summary: "Create a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", format: "password" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "User created successfully" },
          "400": { description: "Invalid signup request" },
          "500": { description: "Internal server error" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "Log in and receive access tokens",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", format: "password" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "User logged in successfully" },
          "400": { description: "Invalid login request" },
          "500": { description: "Internal server error" },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        summary: "Log out the current user",
        security: [{ bearerAuth: [] }],
        responses: {
          "204": { description: "Logged out" },
          "400": { description: "Logout failed" },
          "401": { description: "Unauthorized" },
          "500": { description: "Internal server error" },
        },
      },
    },
    "/api/public/info": {
      get: {
        summary: "Fetch public info",
        responses: {
          "200": { description: "Public endpoint response" },
          "500": { description: "Internal server error" },
        },
      },
    },
    "/api/protected/profile": {
      get: {
        summary: "Fetch the authenticated user profile",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "Protected endpoint response" },
          "401": { description: "Unauthorized" },
          "500": { description: "Internal server error" },
        },
      },
    },
  },
} as const;