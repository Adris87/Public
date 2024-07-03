document.getElementById('ip-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const ipInput = document.getElementById('ip-input').value;
    const responseMessage = document.getElementById('response-message');

    fetch('/update-ip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ip: ipInput })
    })
    .then(response => response.text())
    .then(data => {
        responseMessage.textContent = data;
        document.getElementById('ip-form').reset();
    })
    .catch(error => {
        responseMessage.textContent = 'Error: ' + error.message;
    });
});
