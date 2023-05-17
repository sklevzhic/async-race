export default function getRandomColor(): string {
    const MAX_VALUE = 24;
    const RADIX = 16;
    const PAD_START = 6;

    return `#${((1 << MAX_VALUE) * Math.random() | 0).toString(RADIX).padStart(PAD_START, "0")}`;
}
