module.exports = function ({ items, onItemRender, titulo }) {
    return `
    <h1>${titulo ? titulo : ''}</h1>
    <ul class="results">
        ${items.map(item => onItemRender(item)).join('')}
    </ul>`
}