#!/usr/bin/env node
/**
 * Prints the duration and waveform of an audio file, ready to paste into
 * content/demo-reels.json:
 *
 *   pnpm audio:waveform public/audio/my-reel.mp3 [bars]
 *
 * Requires ffmpeg on the PATH. Each bar is the RMS loudness of its slice,
 * normalised to the loudest bar, which reads closer to what you hear than
 * raw peaks.
 */
import { spawn } from "node:child_process";

const SAMPLE_RATE = 22050;
const MIN_LEVEL = 0.06;

const [file, barsArg = "96"] = process.argv.slice(2);
const bars = Number.parseInt(barsArg, 10);

if (!file || !(bars > 0)) {
  console.error("Usage: pnpm audio:waveform <audio file> [bars]");
  process.exit(1);
}

function decodeToMono(path) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-v",
      "error",
      "-i",
      path,
      "-ac",
      "1",
      "-ar",
      String(SAMPLE_RATE),
      "-f",
      "f32le",
      "-",
    ]);
    const chunks = [];
    ffmpeg.stdout.on("data", (chunk) => chunks.push(chunk));
    ffmpeg.stderr.on("data", (chunk) => process.stderr.write(chunk));
    ffmpeg.on("error", reject);
    ffmpeg.on("close", (code) =>
      code === 0 ? resolve(Buffer.concat(chunks)) : reject(new Error(`ffmpeg exited with ${code}`)),
    );
  });
}

const buffer = await decodeToMono(file);
const samples = new Float32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / 4);
const size = Math.floor(samples.length / bars);

const levels = Array.from({ length: bars }, (_, bar) => {
  let sum = 0;
  for (let i = bar * size; i < (bar + 1) * size; i++) sum += samples[i] ** 2;
  return Math.sqrt(sum / size);
});
const loudest = Math.max(...levels);

console.log(
  JSON.stringify(
    {
      durationInSeconds: Math.round((samples.length / SAMPLE_RATE) * 100) / 100,
      waveform: levels.map((level) => Math.round(Math.max(MIN_LEVEL, level / loudest) * 100) / 100),
    },
    null,
    2,
  ),
);
