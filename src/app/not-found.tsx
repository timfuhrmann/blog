import { ArrowLeft } from "react-feather";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { GridLines, Layout, Padded } from "@/components/Layout/Layout";
import { cn } from "cn";
import type { Metadata } from "next";
import styles from "./not-found.module.css";
import { ForgetHi } from "@/app/ForgetHi";

export const metadata: Metadata = {
  title: "Page not found - Tim Fuhrmann",
};

export default function NotFound() {
  return (
    <>
      <Layout className={cn(styles.rows, "flex-1")}>
        <ForgetHi />

        <Header />

        <Padded row={[2, 3]} size="lg">
          <span className="fluid-display-lg block font-black">404</span>
        </Padded>

        <Padded
          row={[3, 4]}
          col={["bleed-start", "content-start"]}
          md={{ col: ["content-start", "split-1"] }}
        >
          <div className="body-md flex items-center gap-3">
            <span className="bg-layer-1 size-[9px] shrink-0" />
            Not found
          </div>
        </Padded>

        <Padded
          row={[3, 4]}
          col={["content-start", "content-end"]}
          md={{ col: ["split-1", "content-end"] }}
          size="lg"
        >
          <h2 className="fluid-display-xs mb-5 font-extrabold uppercase">This page went missing</h2>
          <p className="text-ghost-0 body-md mb-3 max-w-[38rem]">
            The link you followed doesn&apos;t point anywhere on this site &mdash; it may be broken
            or incomplete.
          </p>
          <p className="text-ghost-0 body-md mb-8 max-w-[38rem]">
            If someone sent you here, please ask them to share the full link, including everything
            after the <span className="bg-layer-1 px-1.5 py-0.5">?</span> search parameter.
          </p>
          <Button href="/">
            <ArrowLeft size={18} aria-hidden /> Back to homepage
          </Button>
        </Padded>

        <GridLines
          v={[
            { x: "content-start", rows: [1, 2] },
            { x: "content-end", rows: [1, 2] },
            { x: "content-start", rows: [3, 4] },
            { x: "content-end", rows: [3, 4] },
          ]}
          h={[
            { y: 2, cols: ["bleed-start", "bleed-end"] },
            { y: 3, cols: ["bleed-start", "bleed-end"] },
          ]}
          md={{
            v: [
              { x: "content-start", rows: [3, 4] },
              { x: "split-1", rows: [3, 4] },
              { x: "split-2", rows: [3, 4] },
              { x: "content-end", rows: [3, 4] },
            ],
            h: [
              { y: 2, cols: ["bleed-start", "bleed-end"] },
              { y: 3, cols: ["bleed-start", "bleed-end"] },
            ],
          }}
        />
      </Layout>
      <Footer hasHomeLink />
    </>
  );
}
