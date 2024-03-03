import { Tasks } from ".prisma/client";

type APIResponse = {
  tasks: {
    pixelTasks: Tasks[],
    coinTasks: Tasks[],
  },
  count: {
    pixelTasksCount: number,
    coinTasksCount: number,
  }
}

export default async function () {
  const { tasks, count } = await (await fetch("http://localhost:3000/api/tasks", {
    cache: "no-cache"
  })).json() as APIResponse
  const headers = ["Conta", "Item", "Quantidade", "Recompensa"];

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
    <table className="relative border-collapse">
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

          <td className="border-y border-zinc-800 px-2 text-center">
            TOTAL
          </td>

          <td className="border-y border-zinc-800 px-2 text-center"></td>

          <td className="border border-zinc-800 px-2 text-center">
            <div className="flex items-center justify-between gap-2">
              <img src="/pixel.png" className="size-4" />
              <span>{count.pixelTasksCount}</span>
            </div>
          </td>
        </tr>
      </thead>
      <tbody className="bg-zinc-900">
        {tasks.pixelTasks.map((task) => {
          return (
            <tr
              key={task.id}
              className={`border-b border-zinc-800 hover:bg-zinc-700 ${task.rewardType === "PIXEL" &&
                [
                  "Popberry",
                  "Butterberry",
                  "Clover",
                  "Grainbow",
                  "Java Bean",
                  "Bluzberry Cotton Candy",
                  "Razzleberry Cotton Candy",
                  "Bluzzleberry Swirl Cotton Candy",
                  "Heartbeet",
                  "Orange Grumpkin",
                  // "Grumpkin",
                  // "Scarrot",
                  // "Watermint",
                  // "Hotato",
                  // "Popberry Wine",
                  // "Sap",
                  // "Popberry Pie",
                  // "Flour",
                  // "Grumpkin Wine",
                  // "Popberry Loaf",
                  // "Construction Powder",
                  // "Wax",
                  // "Clay",
                  // "Pancakes",
                ].includes(task.itemName)
                ? "bg-green-900"
                : ""
                }`}
            >
              <td className="border border-zinc-800 px-2">
                {task.account.name}
              </td>

              <td className="border border-zinc-800 px-2">
                {task.itemName}
              </td>

              <td className="border border-zinc-800 px-2 text-center max-w-8">
                {task.itemQuantity}
              </td>

              <td className="border border-zinc-800 px-2 text-center">
                <div className="flex items-center justify-between gap-2">
                  {task.rewardType === "PIXEL" ? (
                    <img src="/pixel.png" className="size-4" />
                  ) : (
                    <img src="/coin.png" className="size-4" />
                  )}
                  <span>{task.rewardQuantity}</span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
