const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const listingButtons = document.querySelectorAll('.listing-buttons span');
const recipeListing = document.querySelector('.recipe-listing');

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }

    
}console.log(document.querySelector('.add-button.add-ing'))

if(document.querySelector('.add-button.add-ing')){
    document.querySelector('.add-button.add-ing').addEventListener("click", function(event) {
        console.log(`test ing`)
        var newMajesticItem = '<li style="display: none">' +
            '<div class="add-fields">' +
            ' <span class="handler-list"><i class="fa fa-arrows"></i></span>' +
            ' <input type="text" name="ingredients" id="ingredients" required />' +
            ' <span class="del-list"><i class="fa fa-trash"></i></span>' +
            '</div>' +
            '</li>';
    
        document.querySelector('.list-sortable.ingredients-list').insertAdjacentHTML('beforeend', newMajesticItem);
        var children = document.querySelector('.list-sortable.ingredients-list').children;
        for (var i = 0; i < children.length; i++) {
            children[i].style.display = "block";
        }
        bindMajesticItem();
    
        event.preventDefault();
    });
    
    
    document.querySelector('.add-button.add-step').addEventListener("click", function(event) {
        event.preventDefault();
    
        var newMajesticItem = '<li style="display: none">' +
            '<div class="add-fields">' +
            ' <span class="handler-list"><i class="fa fa-arrows"></i></span>' +
            '<textarea class="short-text" name="steps" id="steps" cols="30" rows="10" required > </textarea>' +
            ' <span class="del-list"><i class="fa fa-trash"></i></span>' +
            '</div>' +
            '</li>';
    
        document.querySelector('.list-sortable.steps').insertAdjacentHTML('beforeend', newMajesticItem);
        var children = document.querySelector('.list-sortable.steps').children;
        for (var i = 0; i < children.length; i++) {
            children[i].style.display = "block";
        }
        bindMajesticItem();
    
        event.preventDefault();
    
    });
    
    
    document.querySelector('.add-button.add-tip').addEventListener("click", function(event) {
        event.preventDefault();
    
        var newMajesticItem = '<li style="display: none">' +
            '<div class="add-fields">' +
            ' <span class="handler-list"><i class="fa fa-arrows"></i></span>' +
            '<textarea class="short-text" name="tips" id="tips" cols="30" rows="10" > </textarea>' +
            ' <span class="del-list"><i class="fa fa-trash"></i></span>' +
            '</div>' +
            '</li>';
    
        document.querySelector('.list-sortable.tips').insertAdjacentHTML('beforeend', newMajesticItem);
        var children = document.querySelector('.list-sortable.tips').children;
        for (var i = 0; i < children.length; i++) {
            children[i].style.display = "block";
        }
        bindMajesticItem();
    
        event.preventDefault();
    
    });
    
    function bindMajesticItem() {
        var delList = document.querySelectorAll('.del-list');
    
        console.log(`test bind`)
    
        for (var i = 0; i < delList.length; i++) {
            delList[i].addEventListener("click", function(event) {
                event.preventDefault();
                var li = this.closest('li');
                li.style.display = "none";
                li.parentNode.removeChild(li);
            });
        }
    }
}



if(listingButtons.length){
    
}
listingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    listingButtons.forEach((button) => {
      button.classList.remove('current');
    });

    if (button.classList.contains('grid')) {
      button.classList.add('current');
      if (recipeListing.classList.contains('listing-list')) {
        recipeListing.classList.remove('listing-list');
        recipeListing.classList.add('listing-grid');
      }
    }

    if (button.classList.contains('list')) {
      button.classList.add('current');
      recipeListing.classList.remove('listing-grid');
      recipeListing.classList.add('listing-list');
    }
  });
});
