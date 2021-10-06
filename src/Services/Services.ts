import { PrismaClient, Prisma } from '@prisma/client'
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.CLIENT_ID);

class PrismaConnect {
  private static prismaConnect: PrismaConnect;
  public prisma = new PrismaClient();

  public static getInstance() {
    if (this.prismaConnect == null) {
      this.prismaConnect= new PrismaConnect();
    };
    return this.prismaConnect;
  }
}

const prisma = PrismaConnect.getInstance().prisma;
export { prisma, googleClient };