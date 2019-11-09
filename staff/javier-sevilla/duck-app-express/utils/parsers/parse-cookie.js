module.exports = function (req) {
    const { headers: { cookie } } = req

    const cookies = {}

    if (!cookie) return cookies

    const keyValues = cookie.split(';')

    keyValues.forEach(keyValue => {
        const [key, value] = keyValue.trim().split('=')

        cookies[key] = value
    })

    return cookies
}