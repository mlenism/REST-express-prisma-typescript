import { PrismaClient } from '@prisma/client'
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.CLIENT_ID);
const prisma = new PrismaClient();

export { prisma, googleClient };