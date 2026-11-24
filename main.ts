// The Funniest Toaster Error Message
// u-eager-stork-81-9647-the-funniest-toaster-error-436406cd
//
// Writes one line, at most 120 characters: the error message a kitchen
// toaster shows its owner. The line is deadpan, in one voice, and the
// surprise lands in the last clause: the slice is not stuck, it is
// refusing to come up because it has seen what happens up here.
//
// Node.js 22, standard library only, deterministic: no clock, no
// randomness, no network, no input. Same output on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "E12: One slice refused to pop up. It has seen what happens up here and chosen to stay.";

const MAX_CHARS = 120;

// Gate pre-checks, mirroring the sealed scorer:
// /output/entry.txt must be UTF-8 text of 1 to 120 characters,
// not only whitespace, a single line, no trailing newline.
if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read-back verification: what was written must be byte-for-byte the
// line above, and must still pass every gate check on the written bytes.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: written bytes differ from the entry");
}
if (written.length < 1 || written.length > MAX_CHARS) {
  throw new Error(`read-back length out of range: ${written.length}`);
}
if (written.trim().length === 0) {
  throw new Error("read-back is only whitespace");
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("read-back contains a newline");
}

console.log(
  `wrote ${LINE.length} characters (${Buffer.byteLength(LINE, "utf8")} bytes) to /output/entry.txt`,
);
console.log(
  `verified: read-back matches, ${written.length} characters, single line, no trailing newline`,
);
