/**
 * `moveBefore` — the atomic DOM move — reached lib.dom in TypeScript 5.9. It
 * is declared here so the project type-checks the same under an editor that
 * bundles an older TypeScript than the one in devDependencies. Merging with a
 * lib that already declares it is fine: the identical signature merges as an
 * overload. Still feature-detect at runtime — Baseline since 2025, but not
 * everywhere.
 */
interface ParentNode {
  moveBefore(node: Node, child: Node | null): void;
}
