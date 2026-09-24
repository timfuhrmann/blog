import { HomeView } from "@/app/(home)/components/HomeView/HomeView";
import { Marquee } from "@/components/Marquee/Marquee";

export const dynamic = "force-static";

export default function Home() {
  return (
    <HomeView>
      <Marquee />
    </HomeView>
  );
}
