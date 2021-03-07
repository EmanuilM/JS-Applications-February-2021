const viewButton = document.getElementById('btnViewPost');
function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click' , getPosts);
    viewButton.addEventListener('click' , displayPost);
    
    
}
attachEvents();

async function getPosts() { 

    const response = await fetch(`http://localhost:3030/jsonstore/blog/posts`)
    console.log(response);
    const data = await response.json();
    

    const select = document.getElementById('posts');
    select.innerHTML = '';
    Object.values(data).map(createOption).forEach(element => select.appendChild(element));
}

function displayPost() { 
    const id = document.getElementById('posts').value;
    getComments(id);
}

async function getComments(id) { 
    const ul = document.getElementById('post-comments');
    ul.textContent = '';
    
    const [postResponse , commentsResponse] = await Promise.all([
        fetch(`http://localhost:3030/jsonstore/blog/posts/${id}`),
        fetch(`http://localhost:3030/jsonstore/blog/comments`)
    ])


    const postData = await postResponse.json();
    const commentsData = await commentsResponse.json();

    document.getElementById('post-title').textContent = postData.title;
    document.getElementById('post-body').textContent = postData.body;

    const comments = Object.values(commentsData).filter(x => x.postId == id);

    comments.map(createComment).forEach(x => ul.appendChild(x));

}

function createComment(comment) { 
    const result = document.createElement('li');
    result.textContent = comment.text;
    result.setAttribute('id' , comment.id);
    return result;
}


function createOption(post) { 
    const res = document.createElement('option');
    res.textContent = post.title;
    res.value = post.id;

    return res;
}


