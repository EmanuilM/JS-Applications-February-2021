function attachEvents() {
    const location = document.getElementById('location');
    document.getElementById('submit').addEventListener('click', httpRequest);

    const weatherSymbols = {
        "Sunny": "&#x2600", // ☀
        "Partly sunny": "&#x26C5", // ⛅
        "Overcast": "&#x2601", // ☁
        "Rain": "&#x2614", // ☂
        "Degrees": "&#176",   // °
    }


    function httpRequest() {
        fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
            .then(response => response.json())
            .then(data => {


                const { code, name } = data.find(x => x.name === location.value) || { code: undefined };
                const currentDayConditions = fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
                    .then(response => response.json());

                const next3DaysConditions = fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
                    .then(response => response.json());


                Promise.all([currentDayConditions, next3DaysConditions])
                    .then(([currentDayConditions, next3DaysConditions]) => {
                        const currentConditons = renderTodaysInfo(currentDayConditions);
                        const nextDays = renderNext3DaysInfo(next3DaysConditions);
                        displayConditions(currentConditons,nextDays);
                        location.value = '';
                    })
                    .catch((e) => {
                        console.log(`Invalid data`);
                        alert('Invalid city!');
                    })
            })
    }
    function renderTodaysInfo(data) {
        return renderDiv('', { class: 'forecasts' },
            renderSpan(weatherSymbols[data.forecast.condition], { class: 'condition symbol' }),
            renderSpan('', { class: 'condition' },
                renderSpan(data.name, { class: 'forecast-data' }),
                renderSpan(`${data.forecast.low}${weatherSymbols['Degrees']}/${data.forecast.high}${weatherSymbols['Degrees']}`, { class: 'forecast-data' }),
                renderSpan(data.forecast.condition, { class: 'forecast-data' }),
            )
        )

    }

    function renderNext3DaysInfo(data) {
        return renderDiv('', { class: 'forecast-info' },
        ...data.forecast.map( x => {
            return renderSpan('', { class: 'upcoming' },
                renderSpan(weatherSymbols[x.condition], { class: 'symbol' }),
                renderSpan(`${x.low}${weatherSymbols['Degrees']}/${x.high}${weatherSymbols['Degrees']}`, { class: 'forecast-data' }),
                renderSpan(x.condition, { class: 'forecast-data' })
                )
            })
            )
        }

    function displayConditions(todaysCondition,nextDaysConditions) {
        clearData()
        document.getElementById('forecast').style.display = 'block';
        document.getElementById('current').appendChild(todaysCondition);
        document.getElementById('upcoming').appendChild(nextDaysConditions);


    }

    function clearData() { 
        if(document.getElementById('current').children.length > 1) { 
            const city = Array.from(document.getElementsByClassName('forecasts'))[0]
            const upcomingDays = Array.from(document.getElementsByClassName('forecast-info'))[0]
            document.getElementById('current').removeChild(city);
            document.getElementById('upcoming').removeChild(upcomingDays);
        }
    }


    const renderDiv = createHTMLElements.bind(undefined, 'div');
    const renderSpan = createHTMLElements.bind(undefined, 'span');


    function createHTMLElements(type, content, attrubutes, ...childrens) {
        const element = document.createElement(type);
        if (content !== '') {
            element.innerHTML = content;
        }
        Object.entries(attrubutes).forEach(([k, v]) => element.setAttribute(k, v));
        Array.from(childrens).map(x => element.appendChild(x));
        return element;
    }


}

attachEvents();

