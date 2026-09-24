import "server-only";

/**
 * Server-only environment variables. Importing this file from a Client
 * Component is a build-time error, so the values below never reach the browser.
 */

const required = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const env = {
  CONTENTFUL_SPACE_ID: required("CONTENTFUL_SPACE_ID"),
  CONTENTFUL_DELIVERY_API_ACCESS_TOKEN: required("CONTENTFUL_DELIVERY_API_ACCESS_TOKEN"),
};
