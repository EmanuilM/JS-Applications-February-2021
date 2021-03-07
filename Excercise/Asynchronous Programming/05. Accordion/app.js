function solution() {
    fetch(`http://localhost:3030/jsonstore/advanced/articles/list`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('main').innerHTML = data.map(x => templete(x)).join('');
        
    })
    
    document.getElementById('main').addEventListener('click' , (e) => { 
        if(e.target.tagName === 'BUTTON') { 
            fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${e.target.id}`)
            .then(response => response.json())
            .then(data => { 
                if(e.target.textContent === 'More') { 
                    let element = e.target.parentElement.parentElement.children[1]
                    element.innerHTML = `<p>${data.content}</p>`;
                    e.target.parentNode.parentNode.querySelector('.extra').style.display = 'inline-block';
                    e.target.textContent = 'Less'
                }else { 
                    let element = e.target.parentElement.parentElement.children[1]
                    element.innerHTML = `<p>${data.content}</p>`;
                    e.target.parentNode.parentNode.querySelector('.extra').style.display = 'none';
                    e.target.textContent = 'More'
                }
            })
        }
    })
}

function templete(x) { 
    return `<div class="accordion">
    <div class="head">
        <span>Scalable Vector Graphics</span>
        <button class="button" id=${x._id}>More</button>
    </div>
    <div class="extra">
        <p>${x.title}</p>
    </div>
</div>`
}

solution();
