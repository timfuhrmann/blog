import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { Area, GridLines, Layout } from "@/components/Layout/Layout";
import { ReactNode } from "react";

type HomeViewProps = {
  children: ReactNode;
};

export function HomeView({ children }: HomeViewProps) {
  return (
    <>
      <Layout className="min-h-[32.5rem] flex-1 grid-rows-[auto_auto_1fr_auto_1fr] md:grid-rows-[1fr_auto_1fr_auto_1fr]">
        <Header
          renderIntro={
            <p className="body-md max-w-[max(20rem,50%)] indent-10 md:indent-12">
              Senior software engineer with a keen eye for detail. I care about how software feels,
              so I build interfaces with a strong user experience, and the systems behind them, from
              idea to production.
            </p>
          }
        />

        <Area
          row={[2, 3]}
          col={["bleed-start", "bleed-end"]}
          md={{ col: ["split-1", "split-2"] }}
          className="fluid-display-sm p-4 text-center font-bold uppercase"
        >
          <h2>Senior Software Engineer</h2>
        </Area>

        <Area
          row={[4, 5]}
          col={["content-start", "content-end"]}
          md={{ col: ["center", "split-2"] }}
          className="fluid-display-xl px-1 py-4 text-center font-black tracking-wider uppercase"
        >
          Tim
        </Area>

        <GridLines
          v={[
            { x: "content-start", rows: [1, 2] },
            { x: "content-end", rows: [1, 2] },
            { x: "content-start", rows: [3, 6] },
            { x: "content-end", rows: [3, 6] },
          ]}
          h={[
            { y: 2, cols: ["bleed-start", "bleed-end"] },
            { y: 3, cols: ["bleed-start", "bleed-end"] },
            { y: 4, cols: ["content-start", "content-end"] },
            { y: 5, cols: ["content-start", "content-end"] },
          ]}
          md={{
            v: [
              { x: "content-start", rows: [1, 6] },
              { x: "split-1", rows: [1, 6] },
              { x: "center", rows: [1, 2] },
              { x: "center", rows: [3, 6] },
              { x: "split-2", rows: [1, 6] },
              { x: "content-end", rows: [1, 6] },
            ],
            h: [
              { y: 2, cols: ["bleed-start", "bleed-end"] },
              { y: 3, cols: ["bleed-start", "bleed-end"] },
              { y: 4, cols: ["center", "split-2"] },
              { y: 5, cols: ["center", "split-2"] },
            ],
          }}
        />
      </Layout>
      {children}
      <Footer />
    </>
  );
}
