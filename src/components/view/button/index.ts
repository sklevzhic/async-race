import "./index.scss"

function Button(text: string, classes?: string[]): HTMLButtonElement {
    const button = document.createElement("button")
    button.classList.add("button")
    if (classes) {
        classes.forEach(el => {
            button.classList.add(el)
        })
    }
    button.textContent = text
    return button
}

export default Button