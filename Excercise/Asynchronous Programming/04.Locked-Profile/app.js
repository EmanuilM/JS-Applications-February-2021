function lockedProfile() {
    fetch(`http://localhost:3030/jsonstore/advanced/profiles`)
    .then(res => res.json())
    .then(data => {
        Object.entries(data).map(x => document.getElementById('main').appendChild(template(x)));

    })


    document.getElementById('main').addEventListener('click' , (e) => { 
        if(e.target.textContent  === 'Show more') { 
            if(e.target.parentElement.childNodes[4].checked) { 
                e.target.parentElement.querySelector('#user1HiddenFields').style.display = 'inline-block';
                e.target.textContent = 'Hide it';
            }
        }else if(e.target.textContent === 'Hide it') { 
            if(!e.target.parentElement.childNodes[2].checked) { 
                e.target.parentElement.querySelector('#user1HiddenFields').style.display = 'none';
                e.target.textContent = 'Show more';
            }
        }
    })
    
    
    
    function template(data) { 
        return   renderDiv('',{class:'profile'},
        renderIMG('',{src:'./iconProfile2.png' , class:'userIcon'}),
        renderLabel('Lock',{}),
        renderInput('' , {type:'radio' , name:'user1Locked' , value:'lock'}),
        renderLabel('Unlock',{}),
        renderInput('' , {type:'radio' , name:'user1Locked' , value:'unlock'}),
        renderHr('',{}),
        renderLabel('Username',{}),
        renderInput('',{type:'text' , name:'user1Username', value:`${data[1].username}` , disabled: "readonly"}),
        renderDiv('',{id:'user1HiddenFields'}, 
        renderHr('',{}),
        renderLabel('Email',{}),
        renderInput('',{type:'email' , name:'user1Email' , value:`${data[1].email}` , disabled: 'readonly'}),
        renderLabel('Age',{}),
        renderInput('',{type:'email' , name:'user1Age' , value:`${data[1].age}` , disabled: 'readonly'}),
        ),
        renderButton('Show more',{})
        )
    }
    

    const renderIMG = createHTMLElements.bind(undefined,'img');
    const renderLabel = createHTMLElements.bind(undefined,'label');
    const renderInput = createHTMLElements.bind(undefined,'input');
    const renderDiv = createHTMLElements.bind(undefined,'div');
    const renderHr = createHTMLElements.bind(undefined,'hr');
    const renderButton = createHTMLElements.bind(undefined,'button');
    
    function createHTMLElements(type,content,attributes,...chilrens) { 
        const element = document.createElement(type);
        if(content !== '') { 
            element.textContent = content;
        }
        Object.entries(attributes).forEach(([k, v]) => element.setAttribute(k, v));
        Array.from(chilrens).map(x => element.appendChild(x));
        return element;
        
        }
        
    }
