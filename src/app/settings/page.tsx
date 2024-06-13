"use client";

import { Account } from "@prisma/client";
import Image from "next/image";
import "moment/locale/pt-br";
import { useEffect, useState } from "react";
import { AddDays } from "@/utils/AddDays";
import moment from "moment";

interface IAccount extends Account {
  reputation: number;
}

const headers = [
  "Reputação",
  "Nome",
  "Energia",
  "Coins",
  "$PIXEL",
  "VIP",
  "Arvores",
  "NuCyber",
  "Carnival",
];

export default function Settings() {
  const [accounts, setAccounts] = useState<IAccount[]>();

  useEffect(() => {
    getAccounts();
    setInterval(getAccounts, 1 * 60 * 1000);
  }, []);

  const getAccounts = async () => {
    setAccounts(
      (
        await (
          await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/api/accounts", {
            cache: "no-cache",
          })
        ).json()
      ).accounts
    );
  };

  const handleSetActive = async (
    path: string,
    id: string | undefined = undefined,
    setStatus: boolean | undefined = undefined
  ) => {
    setAccounts(
      (
        await (
          await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/api/accounts", {
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({ path, id, setStatus }),
          })
        ).json()
      ).accounts
    );
  };

  const handleSort = (event: React.MouseEvent<HTMLTableCellElement>) => {
    const sortBy = event.currentTarget.textContent!;

    const isFree = (date: Date) => new Date() > new Date(date);
    const isEmpty = (state: string) => state === "EMPTY";

    const sortedAccounts = accounts!.sort((a, b) => {
      switch (sortBy) {
        case "Reputação":
          return b.reputation - a.reputation;

        case "ID":
          return a.id.charCodeAt(0) - b.id.charCodeAt(0);

        case "Nome":
          return a.name.charCodeAt(0) - b.name.charCodeAt(0);

        case "Energia":
          return b.energy - a.energy;

        case "Coins":
          return b.coin - a.coin;

        case "$PIXEL":
          return b.pixel - a.pixel;

        case "Sementes":
          return b.seeds - a.seeds;

        case "VIP":
          return (
            new Date(b.vipExpiration).getTime() -
            new Date(a.vipExpiration).getTime()
          );

        case "Sauna VIP":
          if (
            isFree(new Date(a.vipExpiration)) &&
            isFree(new Date(b.vipExpiration))
          ) {
            return 0;
          } else if (isFree(new Date(a.vipExpiration))) {
            return 1;
          } else if (isFree(new Date(b.vipExpiration))) {
            return -1;
          } else {
            return (
              new Date(a.vipUpdate).getTime() - new Date(b.vipUpdate).getTime()
            );
          }

        case "Correios":
          return (
            new Date(a.mailUpdate).getTime() - new Date(b.mailUpdate).getTime()
          );

        case "Carnival":
          return (
            new Date(a.carnivalUpdate).getTime() -
            new Date(b.carnivalUpdate).getTime()
          );

        case "Arvores":
          return (
            new Date(a.cityTreeUpdate).getTime() -
            new Date(b.cityTreeUpdate).getTime()
          );

        case "NuCyber":
          return (
            new Date(a.nuCyberUpdate).getTime() -
            new Date(b.nuCyberUpdate).getTime()
          );

        case "Land #2130":
          if (isEmpty(a.landOneState) && isEmpty(b.landOneState)) {
            return 0;
          } else if (isEmpty(a.landOneState)) {
            return 1;
          } else if (isEmpty(b.landOneState)) {
            return -1;
          } else {
            return (
              new Date(a.landOneUpdate).getTime() -
              new Date(b.landOneUpdate).getTime()
            );
          }

        case "Land #2131":
          if (isEmpty(a.landTwoState) && isEmpty(b.landTwoState)) {
            return 0;
          } else if (isEmpty(a.landTwoState)) {
            return 1;
          } else if (isEmpty(b.landTwoState)) {
            return -1;
          } else {
            return (
              new Date(a.landTwoUpdate).getTime() -
              new Date(b.landTwoUpdate).getTime()
            );
          }

        case "Land #270":
          if (isEmpty(a.landThreeState) && isEmpty(b.landThreeState)) {
            return 0;
          } else if (isEmpty(a.landThreeState)) {
            return 1;
          } else if (isEmpty(b.landThreeState)) {
            return -1;
          } else {
            return (
              new Date(a.landThreeUpdate).getTime() -
              new Date(b.landThreeUpdate).getTime()
            );
          }

        default:
          return 0;
      }
    });

    setAccounts([...sortedAccounts]);
  };

  return (
    <table className="border-collapse overflow-x-auto relative w-full">
      <thead className="border-zinc-800 border-b-zinc-600 bg-zinc-950 border border-b-2 sticky top-0">
        <tr className="">
          {headers.map((header) => (
            <th
              key={header}
              className="hover:cursor-pointer"
              onClick={handleSort}
            >
              {header}
            </th>
          ))}
        </tr>
        <tr className="bg-zinc-950 border-b-2 border-zinc-700">
          <td className="px-2 text-center font-bold py-1">-</td>
          <td className="px-2 text-center font-bold py-1">-</td>
          <td className="px-2 text-center font-bold py-1">-</td>
          <td className="px-2 text-center font-bold py-1">-</td>
          <td className="px-2 text-center font-bold py-1">-</td>
          <td className="px-2 text-center font-bold py-1">-</td>
          <td className="px-2 text-center font-bold accent-lime-400">
            <input
              type="checkbox"
              name="isCityTreeActive"
              id="isCityTreeActive"
              checked={
                accounts &&
                accounts.find((account) => !account.isCityTreeActive)
                  ? false
                  : true
              }
              onChange={async () =>
                handleSetActive(
                  "isCityTreeActive",
                  undefined,
                  accounts &&
                    !accounts.find((account) => !account.isCityTreeActive)
                    ? false
                    : true
                )
              }
            />
          </td>
          <td className="px-2 text-center font-bold accent-lime-400">
            <input
              type="checkbox"
              name="isNuCyberActive"
              id="isNuCyberActive"
              checked={
                accounts && accounts.find((account) => !account.isNuCyberActive)
                  ? false
                  : true
              }
              onChange={async () =>
                handleSetActive(
                  "isNuCyberActive",
                  undefined,
                  accounts &&
                    !accounts.find((account) => !account.isNuCyberActive)
                    ? false
                    : true
                )
              }
            />
          </td>
          <td className="px-2 text-center font-bold accent-lime-400">
            <input
              type="checkbox"
              name="isCarnivalActive"
              id="isCarnivalActive"
              checked={
                accounts &&
                accounts.find((account) => !account.isCarnivalActive)
                  ? false
                  : true
              }
              onChange={async () =>
                handleSetActive(
                  "isCarnivalActive",
                  undefined,
                  accounts &&
                    !accounts.find((account) => !account.isCarnivalActive)
                    ? false
                    : true
                )
              }
            />
          </td>
        </tr>
      </thead>
      <tbody className="bg-zinc-900">
        {accounts &&
          accounts.map((account) => {
            return (
              <tr
                key={account.id}
                className="border-b border-zinc-800 hover:bg-zinc-700"
              >
                <td
                  className={`border border-zinc-800 px-2 text-center ${
                    account.reputation >= 600
                      ? "text-lime-400"
                      : account.reputation >= 500
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {account.reputation}
                </td>

                <td className="border border-zinc-800 px-2">{account.name}</td>

                <td className="border border-zinc-800 px-2 min-w-16 max-w-32 text-center">
                  <div className="flex items-center justify-between gap-2">
                    <Image
                      alt="ENERGY"
                      width={1}
                      height={1}
                      src="/energy.png"
                      className="size-4"
                    />
                    <span
                      className={`${
                        account.energy > 900
                          ? "text-red-400"
                          : account.energy > 800
                          ? "text-yellow-400"
                          : "text-lime-400"
                      }`}
                    >
                      {Intl.NumberFormat("pt-BR").format(account.energy)}
                    </span>
                  </div>
                </td>

                <td className="border border-zinc-800 px-2 min-w-20 max-w-32 text-center">
                  <div className="flex items-center justify-between gap-2">
                    <Image
                      alt="COIN"
                      width={1}
                      height={1}
                      src="/coin.png"
                      className="size-4"
                    />
                    <span>
                      {Intl.NumberFormat("pt-BR").format(account.coin)}
                    </span>
                  </div>
                </td>

                <td className="border border-zinc-800 px-2 min-w-20 max-w-32 text-center">
                  <div className="flex items-center justify-between gap-2">
                    <Image
                      alt="$PIXEL"
                      width={1}
                      height={1}
                      src="/pixel.png"
                      className="size-4"
                    />
                    <span>{account.pixel}</span>
                  </div>
                </td>
                <td
                  className={`border border-zinc-800 px-2 max-w-32 text-center ${
                    new Date() > new Date(account.vipExpiration)
                      ? ""
                      : new Date() >
                        AddDays(new Date(account.vipExpiration), -3)
                      ? "text-red-400"
                      : new Date() >
                        AddDays(new Date(account.vipExpiration), -7)
                      ? "text-orange-400"
                      : "text-lime-400"
                  }
                  `}
                >
                  {new Date() > new Date(account.vipExpiration)
                    ? "Free"
                    : moment(account.vipExpiration).format("DD/MM/YYYY")}
                </td>
                <td
                  className={
                    "border border-zinc-800 px-2 max-w-32 text-center accent-lime-400"
                  }
                >
                  <input
                    type="checkbox"
                    name="isCityTreeActive"
                    id="isCityTreeActive"
                    checked={account.isCityTreeActive}
                    onChange={async () =>
                      handleSetActive("isCityTreeActive", account.id)
                    }
                  />
                </td>

                <td
                  className={
                    "border border-zinc-800 px-2 max-w-32 text-center accent-lime-400"
                  }
                >
                  <input
                    type="checkbox"
                    name="isNuCyberActive"
                    id="isNuCyberActive"
                    checked={account.isNuCyberActive}
                    onChange={async () =>
                      handleSetActive("isNuCyberActive", account.id)
                    }
                  />
                </td>

                <td
                  className={
                    "border border-zinc-800 px-2 max-w-32 text-center accent-lime-400"
                  }
                >
                  <input
                    type="checkbox"
                    name="isCarnivalActive"
                    id="isCarnivalActive"
                    checked={account.isCarnivalActive}
                    onChange={async () =>
                      handleSetActive("isCarnivalActive", account.id)
                    }
                  />
                </td>

                {/* <td className="border border-zinc-800 px-2 max-w-32 text-center text-sm">
                  {moment(account.mailUpdate).startOf("minutes").fromNow()}
                </td> */}

                {/* <td className="border border-zinc-800 px-2 max-w-32 text-center text-sm">
                  {moment(account.carnivalUpdate).startOf("minutes").fromNow()}
                </td> */}

                {/* <td className="border border-zinc-800 px-2 max-w-32 text-center">
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
                </td> */}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
