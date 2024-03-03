import { Account } from '@prisma/client';

export default async function Home({ params }: { params: { id: string } }) {
  const account = await (await fetch(`http://localhost:3000/api/accounts/${params.id}`)).json() as Account
  return (
    <form action="#" className='flex flex-wrap flex-col'>
      <div className='flex'>
        <div className='flex gap-2'>
          <label htmlFor="id">ID</label>
          <input type="text" name="id" id="id" value={account.id} />
        </div>
        <div className='flex gap-2'>
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" id="name" value={account.name} />
        </div>
        <div className='flex gap-2'>
          <label htmlFor="isVip">VIP?</label>
          <input type="text" name="isVip" id="isVip" value={account.isVip ? "Sim" : "Não"} />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="energy">Energia</label>
          <input type="text" name="energy" id="energy" value={account.energy} />
        </div>
        <div>
          <input type="text" name="seeds" id="seeds" value={account.seeds} />
          <input type="text" name="currentSeed" id="currentSeed" value={account.currentSeed} />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="coin">COINS</label>
          <input type="text" name="coin" id="coin" value={account.coin} />
        </div>
        <div>
          <label htmlFor="pixel">$PIXEL</label>
          <input type="text" name="pixel" id="pixel" value={account.pixel} />
        </div>
      </div>
    </form>
  );
}
