import { GetEstimatedEnergy } from '@/utils/GetEstimatedEnergy';
import prisma from '@/utils/prisma';
import axios from 'axios';

export const revalidate = 60

interface CoinmarketcapAPI {
  "data": {
    "priceUsd": string,
  },
}

export async function GET() {
  let accounts = await prisma.account.findMany({
    where: {
      isActive: true
    }
  })

  await prisma.$disconnect();

  accounts = accounts.map(account => {
    let reputation = 0;
    const quests = (JSON.parse(account.quests) as { id: string, isCompleted: boolean }[]).filter(quest => quest.isCompleted).map(quest => quest.id);
    const memberships = (JSON.parse(account.memberships) as {
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

    const accountAgeReputation = Math.floor(Math.log10(Math.floor((new Date().getTime() - account.createdAt.getTime()) / (1000 * 60 * 60 * 24)) * 0.2) * 40)
    reputation = reputation + accountAgeReputation;

    return ({
      ...account,
      energy: GetEstimatedEnergy(account),
      mailUpdate: new Date(account.mailUpdate),
      carnivalUpdate: new Date(account.carnivalUpdate),
      reputation
    })
  })

  const pixelUSD = await GetPixelUSD();
  return Response.json({ accounts, pixelUSD })
}

export async function PUT(request: Request) {
  const { path, id, setStatus } = await request.json();

  console.log(path, id, setStatus)

  let accounts = await prisma.account.findMany();

  if (!id) {
    switch (path) {
      case "isCityTreeActive":
        await prisma.account.updateMany({ data: { isCityTreeActive: setStatus } })
        break;

      case "isCarnivalActive":
        await prisma.account.updateMany({ data: { isCarnivalActive: setStatus } })
        break;

      case "isNuCyberActive":
        await prisma.account.updateMany({ data: { isNuCyberActive: setStatus } })
        break;

      default:
        break;
    }
  } else {
    let account = await prisma.account.findUnique({ where: { id } });
    if (!account) return;

    switch (path) {
      case "isCityTreeActive":
        await prisma.account.update({ data: { isCityTreeActive: !account.isCityTreeActive }, where: { id } })
        break;

      case "isCarnivalActive":
        await prisma.account.update({ data: { isCarnivalActive: !account.isCarnivalActive }, where: { id } })
        break;

      case "isNuCyberActive":
        await prisma.account.update({ data: { isNuCyberActive: !account.isNuCyberActive }, where: { id } })
        break;

      default:
        break;
    }
  }

  accounts = await prisma.account.findMany({
    where: {
      isActive: true
    }
  })

  await prisma.$disconnect();

  accounts = accounts.map(account => {
    let reputation = 0;
    const quests = (JSON.parse(account.quests) as { id: string, isCompleted: boolean }[]).filter(quest => quest.isCompleted).map(quest => quest.id);
    const memberships = (JSON.parse(account.memberships) as {
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

    const accountAgeReputation = Math.floor(Math.log10(Math.floor((new Date().getTime() - account.createdAt.getTime()) / (1000 * 60 * 60 * 24)) * 0.2) * 40)
    reputation = reputation + accountAgeReputation;

    return ({
      ...account,
      energy: GetEstimatedEnergy(account),
      mailUpdate: new Date(account.mailUpdate),
      carnivalUpdate: new Date(account.carnivalUpdate),
      reputation
    })
  })

  const pixelUSD = await GetPixelUSD();
  return Response.json({ accounts, pixelUSD })
}

async function GetPixelUSD() {
  // return 0
  const { data } = await axios.get("https://api.coinmarketcap.com/dexer/v3/dexer/pair-info?dexer-platform-name=ronin&address=0xb30b54b9a36188d33eeb34b29eaa38d12511e997&t=1710639970783") as { data: CoinmarketcapAPI };
  return Number(data.data.priceUsd);
}