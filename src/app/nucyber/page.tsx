"use client";

import { Account } from "@prisma/client";
import { UserCog2 } from "lucide-react";
import moment from "moment";
import "moment/locale/pt-br";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AddDays } from "@/utils/AddDays";
import axios from "axios";

interface IAccount extends Account {
  reputation: number;
}

export const headers = [
  "Reputação",
  "Nome",
  "Energia",
  "Coins",
  "$PIXEL",
  "Business Level",
  "Inventário",
  "Craft",
  "Coletar Caixa",
  "Ativo?",
];

export default function NuCyber() {
  const [accounts, setAccounts] = useState<IAccount[]>();
  const [pixelPrice, setPixelPrice] = useState(0);

  useEffect(() => {
    getPixelsPrice();
    getAccounts();
    setInterval(getAccounts, 1 * 60 * 1000);
  }, []);

  const getPixelsPrice = async () => {
    setPixelPrice(
      (
        await (
          await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/api/accounts", {
            cache: "no-cache",
          })
        ).json()
      ).pixelUSD
    );
  };

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

  // const handleSetActive = async (path: string, setStatus: boolean) => {
  //   setAccounts(
  //     (
  //       await (
  //         await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/api/accounts", {
  //           cache: "no-cache",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           method: "PUT",
  //           body: JSON.stringify({ path, setStatus }),
  //         })
  //       ).json()
  //     ).accounts
  //   );
  // };

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
          <td className="px-2 text-center font-bold">-</td>
          <td className="px-2 text-center font-bold">-</td>
          <td className="px-2 text-center font-bold">
            <div className="flex items-center justify-between gap-2">
              <Image
                alt="COIN"
                width={1}
                height={1}
                src="/coin.png"
                className="size-4"
              />
              <span>
                {accounts &&
                  accounts.length > 1 &&
                  Intl.NumberFormat("pt-BR").format(
                    accounts
                      .map((acc) => acc.coin)
                      .reduce((prev, curr) => prev + curr)
                  )}
              </span>
            </div>
          </td>
          <td className="px-2 text-center font-bold">
            <div className="flex items-center justify-between gap-2">
              <Image
                alt="$PIXEL"
                width={1}
                height={1}
                src="/pixel.png"
                className="size-4"
              />
              <span>
                {`${
                  accounts &&
                  accounts.length > 1 &&
                  Intl.NumberFormat("pt-BR").format(
                    accounts
                      .map((acc) => acc.pixel)
                      .reduce((prev, curr) => prev + curr)
                  )
                } (${
                  accounts &&
                  accounts.length > 1 &&
                  Intl.NumberFormat("pt-BR").format(
                    accounts.filter(
                      (acc) => acc.reputation >= 600 && acc.pixel >= 20
                    ).length > 0
                      ? accounts
                          .filter(
                            (acc) => acc.reputation >= 600 && acc.pixel >= 20
                          )
                          .map((acc) => acc.pixel)
                          .reduce((prev, curr) => prev + curr)
                      : 0
                  )
                } - ${
                  accounts &&
                  accounts.length > 1 &&
                  Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    pixelPrice *
                      accounts
                        .filter(
                          (acc) => acc.reputation >= 600 && acc.pixel >= 20
                        )
                        .map((acc) => acc.pixel)
                        .reduce((prev, curr) => prev + curr)
                  )
                })`}
              </span>
            </div>
          </td>
          <td className="px-2 text-center font-bold">-</td>
          <td className="px-2 text-center font-bold">-</td>
          <td className="px-2 text-center font-bold">-</td>
          <td className="px-2 text-center font-bold">-</td>
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
                {/* <td className="border border-zinc-800 px-2">
                  <Link
                    href={
                      process.env.NEXT_PUBLIC_HOST_URL +
                      `/accounts/${account.id}`
                    }
                  >
                    <UserCog2 className="size-4 w-full hover:cursor-pointer" />
                  </Link>
                </td> */}

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

                <td className="border border-zinc-800 px-2 text-center">
                  <div className="flex items-center justify-between gap-2">
                    <Image
                      alt="Business Level"
                      width={1}
                      height={1}
                      src="/business.png"
                      className="size-4"
                    />
                    <span>
                      {JSON.parse(account.levels).business.level || 0}
                    </span>
                  </div>
                </td>

                <td className="border border-zinc-800 px-2 text-center">
                  <div className="flex flex-col justify-center items-center">
                    <span className="leading-none">{account.nuCyberBoxes}</span>
                    <span className="text-xs leading-none text-zinc-400">
                      Box of Supplies
                    </span>
                  </div>
                </td>

                <td
                  className={`border border-zinc-800 px-2 max-w-32 text-center`}
                >
                  <div>
                    <p
                      className={` leading-none ${
                        !account.isNuCyberActive
                          ? "text-gray-400"
                          : new Date() > new Date(account.nuCyberCraftUpdate)
                          ? "text-red-400"
                          : "text-lime-400"
                      }`}
                    >
                      {`${account.nuCyberCraftName.trim()}: ` +
                        moment(account.nuCyberCraftUpdate)
                          .startOf("minutes")
                          .fromNow()}
                    </p>
                  </div>
                </td>

                <td
                  className={`border border-zinc-800 px-2 max-w-32 text-center ${
                    !account.isNuCyberActive
                      ? "text-gray-400"
                      : new Date() > new Date(account.nuCyberUpdate)
                      ? "text-red-400"
                      : "text-lime-400"
                  }`}
                >
                  {moment(account.nuCyberUpdate).startOf("minutes").fromNow()}
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
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
