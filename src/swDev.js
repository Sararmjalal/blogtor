export default function swDew() {
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`
    navigator.serviceWorker.register(swUrl)
}