import prisma from "@/utils/prisma"

export const revalidate = 60

export async function GET(request: Request, { params }: { params: { accountId: string } }) {
  const { accountId } = params
  let tasks = await prisma.tasks.findMany({ where: { accountId: Number(accountId) } })

  return Response.json(tasks)
}