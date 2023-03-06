export function replaceHash(currentHref: string, hash: string): string {
    const URL = currentHref.slice(0, currentHref.indexOf("#"))
    if (URL.includes("#")) {
        return URL.replace("#", hash)
    } else {
        return hash
    }
}