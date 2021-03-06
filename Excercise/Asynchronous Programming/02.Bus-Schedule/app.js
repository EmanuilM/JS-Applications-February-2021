function solve() {
    let info = document.querySelector('#info , span');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let stopName;

    let url = `http://localhost:3030/jsonstore/bus/schedule/depot`;
    function depart() {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            url = `http://localhost:3030/jsonstore/bus/schedule/${data.next}`;
            stopName = data.name;
            info.textContent = `Next stop ${data.name}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        })
        .catch(() => { 
            info.textContent = `Error`;
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        })
    }

    function arrive() {
        info.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();

