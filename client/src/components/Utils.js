export const dateParse = (num) => {
    let options = {hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "long", year:"numeric", month:"short", day:"numeric"}

    let dateparser = Date.parse(num)

    let date = new Date(dateparser).toLocaleDateString('fr-FR', options)
    return date.toString();
}