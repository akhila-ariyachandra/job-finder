import { Hono } from "hono";
import { Webhook } from "svix";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";
import { z } from "zod";
import { clerkClient } from "../lib/clerk.js";

const webhooks = new Hono().post("/user", async (c) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("You need a WEBHOOK_SECRET in your .env");
  }

  // Get the headers and body
  const headers = c.req.header();
  const payload = await c.req.text();

  // Get the Svix headers for verification
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  // If there are no Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return c.text("Error occured -- no svix headers", 400);
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: unknown;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If the verification fails, error out and  return error code
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch {
    return c.text("Error verifying webhook", 400);
  }

  const parsedData = await createUserSchema.parseAsync(evt);

  // Check if the user has a first and last name.
  // If not, generate a random name.
  let firstName = parsedData.data.first_name;
  let lastName = parsedData.data.last_name;
  if (!firstName) {
    firstName = uniqueNamesGenerator({
      dictionaries: [colors],
    });
  }
  if (!lastName) {
    lastName = uniqueNamesGenerator({
      dictionaries: [animals],
    });
  }
  if (!parsedData.data.first_name || !parsedData.data.last_name) {
    await clerkClient.users.updateUser(parsedData.data.id, {
      firstName,
      lastName,
    });
  }

  return c.json(
    {
      success: true,
      message: "Webhook received",
    },
    200,
  );
});

export default webhooks;

const metadataSchema = z.object({});
const createUserSchema = z.object({
  data: z.object({
    birthday: z.string().optional(),
    created_at: z.number(),
    email_addresses: z.array(
      z.object({
        email_address: z.string(),
        id: z.string(),
        linked_to: z.array(z.any()),
        object: z.string(),
        verification: z.object({
          status: z.string(),
          strategy: z.string(),
        }),
      }),
    ),
    external_accounts: z.array(z.any()),
    external_id: z.string().nullable(),
    first_name: z.string().nullable(),
    gender: z.string().optional(),
    id: z.string(),
    image_url: z.string(),
    last_name: z.string().nullable(),
    last_sign_in_at: z.number().nullable(),
    object: z.string(),
    password_enabled: z.boolean(),
    phone_numbers: z.array(z.any()),
    primary_email_address_id: z.string(),
    primary_phone_number_id: z.null(),
    primary_web3_wallet_id: z.null(),
    private_metadata: metadataSchema,
    profile_image_url: z.string(),
    public_metadata: metadataSchema,
    two_factor_enabled: z.boolean(),
    unsafe_metadata: metadataSchema,
    updated_at: z.number(),
    username: z.null(),
    web3_wallets: z.array(z.any()),
  }),
  event_attributes: z.object({
    http_request: z.object({
      client_ip: z.string(),
      user_agent: z.string(),
    }),
  }),
  object: z.string(),
  timestamp: z.number(),
  type: z.string(),
});
