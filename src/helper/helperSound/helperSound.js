import { Howl } from "howler";

const moveSound = new Howl({
  src: ["../sounds/move.mp3"],
  volume: 0.1,
});
const killSound = new Howl({
  src: ["../sounds/kill.mp3"],
  volume: 0.5,
});
const chooseSound = new Howl({
  src: ["../sounds/choose.mp3"],
  volume: 0.4,
});
const cancelSound = new Howl({
  src: ["../sounds/cancel.mp3"],
  volume: 0.2,
});
const winSound = new Howl({
  src: ["../sounds/win.mp3"],
  volume: 0.2,
});
const makeQueenSound = new Howl({
  src: ["../sounds/makeQueen.mp3"],
  volume: 0.2,
});

export function playMoveSound() {
  moveSound.play();
}
export function playKillSound() {
  killSound.play();
}
export function playChooseSound() {
  chooseSound.play();
}
export function playCancelSound() {
  cancelSound.play();
}
export function playMakeQueenSound() {
  makeQueenSound.play();
}
export function playWinSound() {
  winSound.play();
}
