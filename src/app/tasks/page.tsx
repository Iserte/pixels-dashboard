"use client";

import { Tasks, Account } from ".prisma/client";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PrismaTasks extends Tasks {
  account: Account;
}

type APIResponse = {
  tasks: {
    pixelTasks: PrismaTasks[];
    coinTasks: PrismaTasks[];
  };
  count: {
    pixelTasksCount: number;
    coinTasksCount: number;
  };
};

const headers = ["Conta", "Item", "Quantidade", "Recompensa", "Entregar"];

export default function TasksPage() {
  const [apiResponse, setApiResponse] = useState<APIResponse>();

  useEffect(() => {
    getApiData();
    setInterval(getApiData, 1 * 60 * 1000);
  }, []);

  const getApiData = async () => {
    setApiResponse(
      await (
        await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/api/tasks", {
          cache: "no-cache",
        })
      ).json()
    );
  };

  async function refreshTask(id: number) {
    setApiResponse(
      await (
        await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/api/tasks", {
          cache: "no-cache",
          method: "PUT",
          body: JSON.stringify({ id }),
        })
      ).json()
    );
  }

  // const handleSort = (event: React.MouseEvent<HTMLTableCellElement>) => {
  //   const sortBy = event.currentTarget.textContent!;

  //   const isFree = (date: Date) => new Date(date) < new Date(2024, 0);
  //   const isEmpty = (state: string) => state === "EMPTY";

  //   const sortedtasks = tasks.sort((a, b) => {
  //     switch (sortBy) {
  //       case "ID":
  //         return a.id - b.id;

  //       case "Nome":
  //         return a.name.charCodeAt(0) - b.name.charCodeAt(0);

  //       case "Energia":
  //         return b.energy - a.energy;

  //       case "Coins":
  //         return b.coin - a.coin;

  //       case "$PIXEL":
  //         return b.pixel - a.pixel;

  //       case "Sementes":
  //         return b.seeds - a.seeds;

  //       case "Sauna VIP":
  //         if (isFree(new Date(a.vipUpdate)) && isFree(new Date(b.vipUpdate))) {
  //           return 0;
  //         } else if (isFree(new Date(a.vipUpdate))) {
  //           return 1;
  //         } else if (isFree(new Date(b.vipUpdate))) {
  //           return -1;
  //         } else {
  //           return (
  //             new Date(a.vipUpdate).getTime() - new Date(b.vipUpdate).getTime()
  //           );
  //         }

  //       case "Correios":
  //         return (
  //           new Date(a.mailUpdate).getTime() - new Date(b.mailUpdate).getTime()
  //         );

  //       case "Carnaval":
  //         return (
  //           new Date(a.carnivalUpdate).getTime() -
  //           new Date(b.carnivalUpdate).getTime()
  //         );

  //       case "Land #2130":
  //         if (isEmpty(a.landOneState) && isEmpty(b.landOneState)) {
  //           return 0;
  //         } else if (isEmpty(a.landOneState)) {
  //           return 1;
  //         } else if (isEmpty(b.landOneState)) {
  //           return -1;
  //         } else {
  //           return (
  //             new Date(a.landOneUpdate).getTime() -
  //             new Date(b.landOneUpdate).getTime()
  //           );
  //         }

  //       case "Land #2131":
  //         if (isEmpty(a.landTwoState) && isEmpty(b.landTwoState)) {
  //           return 0;
  //         } else if (isEmpty(a.landTwoState)) {
  //           return 1;
  //         } else if (isEmpty(b.landTwoState)) {
  //           return -1;
  //         } else {
  //           return (
  //             new Date(a.landTwoUpdate).getTime() -
  //             new Date(b.landTwoUpdate).getTime()
  //           );
  //         }

  //       case "Land #270":
  //         if (isEmpty(a.landThreeState) && isEmpty(b.landThreeState)) {
  //           return 0;
  //         } else if (isEmpty(a.landThreeState)) {
  //           return 1;
  //         } else if (isEmpty(b.landThreeState)) {
  //           return -1;
  //         } else {
  //           return (
  //             new Date(a.landThreeUpdate).getTime() -
  //             new Date(b.landThreeUpdate).getTime()
  //           );
  //         }

  //       default:
  //         return 0;
  //     }
  //   });

  //   settasks([...sortedtasks]);
  // };

  return (
    <table className="border-collapse overflow-x-auto relative w-full max-w-screen-md">
      <thead className="border-zinc-800 border-b-zinc-600 bg-zinc-950 border border-b-2 sticky top-0">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="hover:cursor-pointer border-x border-zinc-800 px-4"
              // onClick={handleSort}
            >
              {header}
            </th>
          ))}
        </tr>
        <tr
          key={"TOTAL"}
          className="border-b border-zinc-800 hover:bg-zinc-700 bg-zinc-950"
        >
          <td className="border-y border-l border-zinc-800 px-2 text-center"></td>

          <td className="border-y border-zinc-800 px-2 text-center">TOTAL</td>

          <td className="border-y border-zinc-800 px-2 text-center"></td>

          <td className="border border-zinc-800 px-2 text-center">
            <div className="flex items-center justify-between gap-2">
              <Image
                alt="$PIXEL"
                width={1}
                height={1}
                src="/pixel.png"
                className="size-4"
              />
              <span>
                {apiResponse &&
                  apiResponse.count &&
                  apiResponse.count.pixelTasksCount}
              </span>
            </div>
          </td>
        </tr>
      </thead>
      <tbody className="bg-zinc-900">
        {apiResponse &&
          apiResponse.tasks &&
          apiResponse.tasks.pixelTasks &&
          apiResponse.tasks.pixelTasks.map((task) => {
            return (
              <tr
                key={task.id}
                className={`border-b border-zinc-800 hover:bg-zinc-700 ${
                  task.account.name.startsWith("🛒") ? "bg-green-900" : ""
                }`}
              >
                <td className="border border-zinc-800 px-2">
                  {task.account.name}
                </td>

                <td className="border border-zinc-800 px-2">{task.itemName}</td>

                <td className="border border-zinc-800 px-2 text-center max-w-8">
                  {task.itemQuantity}
                </td>

                <td className="border border-zinc-800 px-2 text-center">
                  <div className="flex items-center justify-between gap-2">
                    {task.rewardType === "PIXEL" ? (
                      <Image
                        alt="$PIXEL"
                        width={1}
                        height={1}
                        src="/pixel.png"
                        className="size-4"
                      />
                    ) : (
                      <Image
                        alt="COIN"
                        width={1}
                        height={1}
                        src="/coin.png"
                        className="size-4"
                      />
                    )}
                    <span>{task.rewardQuantity}</span>
                  </div>
                </td>
                <td
                  className="border border-zinc-800 px-2 hover:cursor-pointer"
                  onClick={() => refreshTask(task.id)}
                >
                  <RefreshCw className="size-4 w-full" />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
