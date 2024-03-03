import { Account, Tasks } from ".prisma/client"
import prisma from "@/utils/prisma"

export const revalidate = 60


export async function GET() {
  let tasks = await prisma.tasks.findMany({
    select: {
      id: true,
      itemName: true,
      itemQuantity: true,
      rewardType: true,
      rewardQuantity: true,
      expiresAt: true,
      account: {
        select: {
          name: true,
          isVip: true
        }
      },
    },
    orderBy: { accountId: 'asc' },
  })

  tasks = tasks
    .filter(task => new Date() < task.expiresAt)
    .filter(task => !task.itemName.includes("ENTREGUE"))

  if (tasks.length > 0) {
    tasks = tasks.map(task => ({
      ...task,
      account: {
        ...task.account,
        name: task.account.isVip ? "[VIP] " + task.account.name : task.account.name
      }
    }))
      .sort((a, b) => {
        if (a.account.name.startsWith("[VIP]") > b.account.name.startsWith("[VIP]")) {
          return -1
        } else if (a.account.name.startsWith("[VIP]") < b.account.name.startsWith("[VIP]")) {
          return 1
        } else {
          return 0
        }
      })
  }

  let pixelTasks = tasks.filter(task => task.rewardType === "PIXEL")
  let coinTasks = tasks.filter(task => task.rewardType === "COIN")

  const pixelTasksCount = pixelTasks.length
  const coinTasksCount = coinTasks.length



  return Response.json({
    tasks: {
      pixelTasks,
      coinTasks,
    },
    count: {
      pixelTasksCount,
      coinTasksCount
    }
  })
}