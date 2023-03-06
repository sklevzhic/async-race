export default function convertMsToSec(ms: number): number {
    return +Number(ms / 1000).toFixed(2)
}