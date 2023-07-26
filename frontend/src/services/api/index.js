export default function SendRequest(url) {
    fetch(url).then(
        response => response.json()
    );
}