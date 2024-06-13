import { Account } from "@prisma/client";

export default async function AccountDetails({
  params,
}: {
  params: { id: string };
}) {
  const account = (await (
    await fetch(process.env.NEXT_PUBLIC_HOST_URL + `/api/accounts/${params.id}`)
  ).json()) as Account;

  return (
    <form action="#" className="flex flex-wrap flex-col">
      <div className="m-2">
        <button className="border text-left py-1 px-2 rounded hover:cursor-pointer">
          Voltar
        </button>
      </div>
      <div className="flex gap-4 justify-between border-y-zinc-200 border-y py-8">
        <div className="flex gap-2">
          <label htmlFor="id">ID:</label>
          <input
            className="border rounded border-zinc-700 px-2 max-w-12 text-center"
            type="text"
            name="id"
            id="id"
            disabled
            value={account.id}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="name">Nome:</label>
          <input
            className="border rounded border-zinc-700 px-2 max-w-48 text-center"
            type="text"
            name="name"
            id="name"
            disabled
            value={account.name}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="isVip">VIP?</label>
          <input
            className="border rounded border-zinc-700 px-2 max-w-48 text-center"
            type="text"
            name="isVip"
            id="isVip"
            disabled
            value={account.vipExpiration > new Date() ? "Sim" : "Não"}
          />
        </div>
      </div>
      <div className="flex gap-4 items-center justify-between border-y-zinc-200 border-y py-8">
        <div className="flex gap-2">
          <label htmlFor="energy">Energia:</label>
          <input
            className="border rounded border-zinc-700 px-2 max-w-20 text-center"
            type="text"
            name="energy"
            id="energy"
            value={account.energy}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="seeds">Semente:</label>
          <div className="border rounded border-zinc-700 px-2 max-w-48 text-center flex justify-center flex-col">
            <input
              className="text-center"
              type="text"
              name="currentSeed"
              id="currentSeed"
              value={account.currentSeed}
              disabled
            />
            <input
              className="text-center text-xs"
              type="text"
              name="seeds"
              id="seeds"
              value={`x${account.seeds}`}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-between border-y-zinc-200 border-y py-8">
        <div className="flex gap-2">
          <label htmlFor="coin">COINS:</label>
          <input
            className="border rounded border-zinc-700 px-2 max-w-32 text-center"
            type="text"
            name="coin"
            id="coin"
            value={account.coin}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="pixel">$PIXEL:</label>
          <input
            className="border rounded border-zinc-700 px-2 max-w-16 text-center"
            type="text"
            name="pixel"
            id="pixel"
            value={account.pixel}
          />
        </div>
      </div>
      <div className="flex gap-4 justify-between border-y-zinc-200 border-y py-8">
        <div className="flex gap-2">
          <label htmlFor="coin">Land #2130:</label>
          <input
            className="border rounded border-zinc-700 px-2 max-w-32 text-center"
            type="text"
            name="currentSeed"
            id="currentSeed"
            value={account.landOneState}
            disabled
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="coin">Land #2131:</label>
          <input
            className="border rounded border-zinc-700 px-2 max-w-32 text-center"
            type="text"
            name="currentSeed"
            id="currentSeed"
            value={account.landTwoState}
            disabled
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="coin">Land #270:</label>
          <input
            className="border rounded border-zinc-700 px-2 max-w-32 text-center"
            type="text"
            name="currentSeed"
            id="currentSeed"
            value={account.landThreeState}
            disabled
          />
        </div>
      </div>
    </form>
  );
}
