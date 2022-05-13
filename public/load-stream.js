const td = new TextDecoder('utf-8')
window.onload = () => {
    fetch('stream').then(response => response.body.getReader()).then(reader => {
        reader.read().then(function handleStreamValue({ done, value }) {
            if (done) {
                console.log("Stream complete");
                return;
            }
            const decodedValue = td.decode(value)
            appendText(decodedValue)
            return reader.read().then(handleStreamValue);
        })
    })

    function appendText(value) {
        const p = document.createElement('p');
        p.innerText = value
        document.getElementById("from-stream").appendChild(p)
    }
}