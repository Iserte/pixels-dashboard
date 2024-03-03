import Header from "@/components/header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (<>
    <Header />
    <main className="relative justify-center flex my-4">
      {children}
    </main>
  </>);
}