import { Account, Tasks } from ".prisma/client"
import { AddMinutes } from "@/utils/AddMinutes"
import prisma from "@/utils/prisma"

export const revalidate = 60


export async function GET() {
  let data = await GetDatabaseTasks();

  return Response.json(data);
}

export async function PUT(request: Request) {
  const { id } = await request.json();

  const task = await prisma.tasks.findUnique({ where: { id } });

  await prisma.tasks.update({
    data: {
      expiresAt: AddMinutes(new Date(), 5),
      itemName: `${task!.itemName} - ENTREGUE`
    },
    where: {
      id
    }
  })

  let data = await GetDatabaseTasks();

  return Response.json(data)
}

async function GetDatabaseTasks() {
  let tasks = await prisma.tasks.findMany({
    select: {
      id: true,
      itemName: true,
      itemQuantity: true,
      rewardType: true,
      rewardQuantity: true,
      expiresAt: true,
      account: true,
    },
    orderBy: { accountId: 'asc' },
    where: {
      account: {
        isActive: true
      }
    }
  })

  await prisma.$disconnect();

  tasks = tasks
    .filter(task => new Date() < task.expiresAt)
    .filter(task => !task.itemName.includes("ENTREGUE"))

  if (tasks.length > 0) {
    tasks = tasks.map(task => {
      let reputation = 0;
      const quests = (JSON.parse(task.account.quests) as { id: string, isCompleted: boolean }[]).filter(quest => quest.isCompleted).map(quest => quest.id);
      const memberships = (JSON.parse(task.account.memberships) as {
        "vip"?: {
          "expiration": number
        },
        "Discord"?: {
          "count": 1
        },
        "Twitter"?: {
          "count": 1
        },
        "email"?: {
          "count": 1
        }
      })

      if (quests.includes("qst_flourPowder")) reputation = reputation + 50;
      if (quests.includes("qst_wine2Delivery")) reputation = reputation + 50;
      if (quests.includes("qst_MilkshakeForJihoz")) reputation = reputation + 150;
      if (quests.includes("qst_ygg_03")) reputation = reputation + 200;

      if (memberships.vip) reputation = reputation + 1500
      if (memberships.Discord) reputation = reputation + 100
      if (memberships.Twitter) reputation = reputation + 50
      if (memberships.email) reputation = reputation + 5

      const accountAgeReputation = Math.floor(Math.log10(Math.floor((new Date().getTime() - task.account.createdAt.getTime()) / (1000 * 60 * 60 * 24)) * 0.2) * 40)
      reputation = reputation + accountAgeReputation;

      return {
        ...task,
        account: {
          ...task.account,
          name: reputation > 500 ? "🛒 " + task.account.name : task.account.name
        }
      }
    })
      .sort((a, b) => {
        if (a.account.name.startsWith("🛒") > b.account.name.startsWith("🛒")) {
          return -1
        } else if (a.account.name.startsWith("🛒") < b.account.name.startsWith("🛒")) {
          return 1
        } else {
          return 0
        }
      })
    let pixelTasks = tasks.filter(task => task.rewardType === "PIXEL")
    let coinTasks = tasks.filter(task => task.rewardType === "COIN")

    const pixelTasksCount = pixelTasks.length > 0 ? pixelTasks.map(task => task.rewardQuantity).reduce((prev, curr) => prev + curr) : 0
    const coinTasksCount = coinTasks.length > 0 ? coinTasks.map(task => task.rewardQuantity).reduce((prev, curr) => prev + curr) : 0

    return {
      tasks: {
        pixelTasks,
        coinTasks,
      },
      count: {
        pixelTasksCount,
        coinTasksCount
      }
    }
  } else {
    return {
      tasks: [],
      count: []
    }
  }
}