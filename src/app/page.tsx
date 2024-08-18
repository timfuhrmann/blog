import { Header } from "@/components/home/header";

export default function Home() {
  return (
    <main>
      <Header ms={Date.now() - Date.parse("03-19-1998")} />
    </main>
  );
}
