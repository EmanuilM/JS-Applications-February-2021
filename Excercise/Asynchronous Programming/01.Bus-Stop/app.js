function getInfo() {
    const inputValue = document.getElementById('stopId');
    const stopName = document.getElementById('stopName');
    const busesUl = document.getElementById('buses');
    if(inputValue.value === '') { 
        stopName.innerHTML = 'Error';
        inputValue.value = '';
        busesUl.innerHTML = '';
        alert('Invalid bus id!');
        return;
    }
    fetch(`http://localhost:3030/jsonstore/bus/businfo/${inputValue.value}`)
    .then(responese => responese.json())
    .then(data => {
        let { buses, name } = data;
        stopName.textContent = name;
        busesUl.innerHTML = Object.entries(buses).map(([id,time]) => `<li>Bus ${id} arrives in ${time}</li>`).join('');
    })
    inputValue.value = '';
}

