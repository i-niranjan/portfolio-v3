// Tiny client-side signal so intro animations (hero, etc.) wait for the
// first-visit boot screen instead of playing hidden underneath it.

type Listener = () => void;

let done = false;
const listeners: Listener[] = [];

export function isBootDone() {
  return done;
}

export function markBootDone() {
  if (done) return;
  done = true;
  listeners.splice(0).forEach((listener) => listener());
}

export function onBootDone(listener: Listener) {
  if (done) {
    listener();
    return;
  }
  listeners.push(listener);
}
