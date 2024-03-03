import { UserCog2 } from "lucide-react";
import moment from "moment";
import { Account } from '@prisma/client';
import Link from "next/link";

export const headers = [
  "Config",
  "ID",
  "Nome",
  "Energia",
  "Coins",
  "$PIXEL",
  "Sementes",
  "Sauna VIP",
  "Correios",
  "Carnaval",
  "Land #2130",
  "Land #2131",
  "Land #270",
];

export default async function Accounts() {
  const accounts = await (await fetch("http://localhost:3000/api/accounts", {
    cache: "no-cache"
  })).json() as Account[] | undefined


  // const handleSort = (event: React.MouseEvent<HTMLTableCellElement>) => {
  //   const sortBy = event.currentTarget.textContent!;

  //   const isFree = (date: Date) => new Date(date) < new Date(2024, 0);
  //   const isEmpty = (state: string) => state === "EMPTY";

  //   const sortedAccounts = accounts!.sort((a, b) => {
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

  //   // setAccounts([...sortedAccounts]);
  // };

  return (
    <table className="relative border-collapse">
      <thead className="border-zinc-800 border-b-zinc-600 bg-zinc-950 border border-b-2 sticky top-0">
        <tr className="">
          {headers.map((header) => (
            <th
              key={header}
              className="hover:cursor-pointer"
            // onClick={handleSort}
            >
              {header}
            </th>
          ))}
        </tr>
        <tr className="bg-zinc-950 border-b-2 border-zinc-700">
          <td className="border border-zinc-800 px-2 text-center font-bold py-1">
            TOTAL
          </td>
          <td className="border border-zinc-800 px-2 text-center font-bold">
            -
          </td>
          <td className="border border-zinc-800 px-2 text-center font-bold">
            -
          </td>
          <td className="border border-zinc-800 px-2 text-center font-bold">
            -
          </td>
          <td className="border border-zinc-800 px-2 text-center font-bold">
            <div className="flex items-center justify-between gap-2">
              <img src="/coin.png" className="size-4" />
              <span>
                {accounts && accounts.length > 1 &&
                  accounts
                    .map((acc) => acc.coin)
                    .reduce((prev, curr) => prev + curr)}
              </span>
            </div>
          </td>
          <td className="border border-zinc-800 px-2 text-center font-bold">
            <div className="flex items-center justify-between gap-2">
              <img src="/pixel.png" className="size-4" />
              <span>
                {accounts && accounts.length > 1 &&
                  accounts
                    .map((acc) => acc.pixel)
                    .reduce((prev, curr) => prev + curr)}
              </span>
            </div>
          </td>
          <td className="border border-zinc-800 px-2 text-center font-bold">
            -
          </td>
          <td className="border border-zinc-800 px-2 text-center font-bold">
            -
          </td>
          <td className="border border-zinc-800 px-2 text-center font-bold">
            -
          </td>
          <td className="border border-zinc-800 px-2 text-center font-bold">
            -
          </td>
          <td className="border border-zinc-800 px-2 text-center font-bold">
            -
          </td>
          <td className="border border-zinc-800 px-2 text-center font-bold">
            -
          </td>
          <td className="border border-zinc-800 px-2 text-center font-bold">
            -
          </td>
        </tr>
      </thead>
      <tbody className="bg-zinc-900">
        {accounts && accounts.map((account) => {
          return (
            <tr
              key={account.id}
              className="border-b border-zinc-800 hover:bg-zinc-700"
            >
              <td className="border border-zinc-800 px-2">
                <Link href={`http://localhost:3000/accounts/${account.id}`}><UserCog2 className="size-4 w-full hover:cursor-pointer" /></Link>
              </td>

              <td className="border border-zinc-800 px-2 text-center">
                {account.id}
              </td>

              <td className="border border-zinc-800 px-2">
                {account.name}
              </td>

              <td className="border border-zinc-800 px-2 min-w-16 max-w-32 text-center">
                <div className="flex items-center justify-between gap-2">
                  <img src="/energy.png" className="size-4" />
                  <span>{account.energy}</span>
                </div>
              </td>

              <td className="border border-zinc-800 px-2 min-w-20 max-w-32 text-center">
                <div className="flex items-center justify-between gap-2">
                  <img src="/coin.png" className="size-4" />
                  <span>{account.coin}</span>
                </div>
              </td>

              <td className="border border-zinc-800 px-2 min-w-20 max-w-32 text-center">
                <div className="flex items-center justify-between gap-2">
                  <img src="/pixel.png" className="size-4" />
                  <span>{account.pixel}</span>
                </div>
              </td>

              <td className="border border-zinc-800 px-2 text-center">
                <div className="flex flex-col justify-center items-center">
                  <span className="leading-none">{account.seeds}</span>
                  <span className="text-xs leading-none text-zinc-400">
                    {account.currentSeed}
                  </span>
                </div>
              </td>

              <td className="border border-zinc-800 px-2 max-w-32 text-center">
                {new Date(account.vipUpdate) < new Date(2024, 0)
                  ? "Conta Free"
                  : moment(account.vipUpdate)
                    .startOf("minutes")
                    .fromNow()}
              </td>

              <td className="border border-zinc-800 px-2 max-w-32 text-center">
                {moment(account.mailUpdate)
                  .startOf("minutes")
                  .fromNow()}
              </td>

              <td className="border border-zinc-800 px-2 max-w-32 text-center">
                {moment(account.carnivalUpdate)
                  .startOf("minutes")
                  .fromNow()}
              </td>

              <td className="border border-zinc-800 px-2 max-w-32 text-center">
                <div>
                  {account.landOneState === "FULL" ? (
                    <p className="text-xs leading-none">
                      {"Pronto " +
                        moment(account.landOneUpdate)
                          .startOf("minutes")
                          .fromNow()}
                    </p>
                  ) : (
                    <p className="leading-none">Vazio</p>
                  )}
                </div>
              </td>

              <td className="border border-zinc-800 px-2 max-w-32 text-center">
                <div>
                  {account.landTwoState === "FULL" ? (
                    <p className="text-xs leading-none">
                      {"Pronto " +
                        moment(account.landTwoUpdate)
                          .startOf("minutes")
                          .fromNow()}
                    </p>
                  ) : (
                    <p className="leading-none">Vazio</p>
                  )}
                </div>
              </td>

              <td className="border border-zinc-800 px-2 max-w-32 text-center">
                <div>
                  {account.landThreeState === "FULL" ? (
                    <p className="text-xs leading-none">
                      {"Pronto " +
                        moment(account.landThreeUpdate)
                          .startOf("minutes")
                          .fromNow()}
                    </p>
                  ) : (
                    <p className="leading-none">Vazio</p>
                  )}
                </div>
              </td>

            </tr>
          );
        })}
      </tbody>
    </table>
  )
}
