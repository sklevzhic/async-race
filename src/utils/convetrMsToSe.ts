export default function convertMsToSec(ms: number): number {
    const FRACTION_DIGITS = 2;
    const DIVIDER = 1000;

    return +Number(ms / DIVIDER).toFixed(FRACTION_DIGITS);
}
