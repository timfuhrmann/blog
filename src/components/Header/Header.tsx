import { GridLines, Padded } from "@/components/Layout/Layout";
import { Link } from "@/components/Link";
import { ReactNode } from "react";
import { cn } from "cn";
import { HeaderBirthday } from "@/components/Header/HeaderBirthday";

const ROW = [1, 2] as const;

/** Above anything that reaches up under the header, e.g. the selected-work track. */
const CELL = "relative z-10";

type HeaderProps = {
  renderIntro?: ReactNode;
};

export const Header = ({ renderIntro }: HeaderProps) => {
  return (
    <>
      <Padded
        row={ROW}
        col={["bleed-start", "content-start"]}
        md={{ col: ["content-start", "split-1"] }}
        className={CELL}
      >
        <Link href="/">
          <h1 className="body-md leading-tight font-medium">
            Tim
            <br />
            Fuhrmann
          </h1>
        </Link>
      </Padded>
      <Padded
        row={ROW}
        col={["content-end", "bleed-end"]}
        md={{ col: ["split-1", "center"] }}
        className={cn(CELL, "body-md hidden font-medium md:block")}
      >
        <HeaderBirthday />
      </Padded>
      <Padded
        row={ROW}
        col={["content-start", "content-end"]}
        md={{ col: ["center", "split-2"] }}
        className={cn(CELL, "pb-12")}
      >
        {renderIntro}
      </Padded>
      <Padded
        row={ROW}
        col={["content-end", "bleed-end"]}
        className={cn(
          CELL,
          "body-md flex items-center justify-start pb-7 leading-none [writing-mode:vertical-lr] md:pb-10"
        )}
      >
        @IBM
      </Padded>

      <GridLines
        v={[
          { x: "content-start", rows: [1, 2] },
          { x: "content-end", rows: [1, 2] },
        ]}
        h={[{ y: 2, cols: ["bleed-start", "bleed-end"] }]}
        md={{
          v: [
            { x: "content-start", rows: [1, 2] },
            { x: "split-1", rows: [1, 2] },
            { x: "center", rows: [1, 2] },
            { x: "split-2", rows: [1, 2] },
            { x: "content-end", rows: [1, 2] },
          ],
          h: [{ y: 2, cols: ["bleed-start", "bleed-end"] }],
        }}
      />
    </>
  );
};
