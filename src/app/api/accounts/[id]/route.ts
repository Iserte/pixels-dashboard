import { GetEstimatedEnergy } from '@/utils/GetEstimatedEnergy';
import prisma from '@/utils/prisma';
import { Account } from '@prisma/client';

export const revalidate = 60

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  let account = await prisma.account.findUnique({ where: { id: Number(id) } })
  if (account) {
    account = {
      ...account,
      energy: GetEstimatedEnergy(account),
      mailUpdate: new Date(account.mailUpdate),
      carnivalUpdate: new Date(account.carnivalUpdate),
    }
  }

  return Response.json(account)
}