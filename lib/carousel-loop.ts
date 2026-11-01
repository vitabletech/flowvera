export function loopIndex(position: number, count: number) {
  return ((position % count) + count) % count;
}

export function loopTarget(position: number, target: number, count: number) {
  const delta = loopIndex(target - loopIndex(position, count), count);
  return position + (delta > count / 2 ? delta - count : delta);
}

export function repeatSlides<T>(items: readonly T[], visible: number) {
  if (items.length === 0) return [];
  const copies = 3 + Math.ceil(visible / items.length);
  return Array.from({ length: items.length * copies }, (_, position) => ({
    item: items[position % items.length],
    logicalIndex: position % items.length,
    position
  }));
}
