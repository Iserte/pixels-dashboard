import { GetEstimatedEnergy } from '@/utils/GetEstimatedEnergy';
import prisma from '@/utils/prisma';

export const revalidate = 60

export async function GET() {
  let accounts = await prisma.account.findMany()
  accounts = accounts.map(account => ({
    ...account,
    energy: GetEstimatedEnergy(account),
    mailUpdate: new Date(account.mailUpdate),
    carnivalUpdate: new Date(account.carnivalUpdate),
  }))

  return Response.json(accounts)
}