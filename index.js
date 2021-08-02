
function main(){
    let data = getTodoList()

    //console.log(data)
    updateDataAndDisplay(data)
}

function updateDataAndDisplay(data){
    localStorage.setItem('todo', JSON.stringify(data))

    let todoContainer = document.getElementById('todo')
    let nhtml = '<table><h1>TODO</h1>'
    
    data["TODO"].forEach((e) => {
        nhtml += 
        `<tr> <div id = ${e.id} class = "todoItem">
            <input type = "checkbox" id = ${e.id} ${e.status}>
            <label for = ${e.id}>${e.name}</label>
            <button class = "delete" onclick = "deleteItem(this)">⦻</button>
        </div> </tr>
        `
    })

    nhtml += 
    `<tr> <div id = "newItem" class = "todoItem">
        <label id = "newItem" onclick = "addNewItem(this.parentNode)">+</label>
    </div> </tr>
    `

    nhtml += '</table>'
    todoContainer.innerHTML = nhtml
}

function deleteItem(item){
    let data = getTodoList()

    for (let i = 0; i < data["TODO"].length; i++){
        console.log(data["TODO"][i].id, item.parentNode.id)
        if (data["TODO"][i].id == item.parentNode.id) data["TODO"].splice(i, 1)
    }

    console.log(data)
    
    // console.log(itemId.parentNode.id)
    updateDataAndDisplay(data)
}

function addNewItem(div){
    console.log(div)
    let nhtml = 
    `<input id = "textField" type = "text" placeholder = "TODO" onkeydown = "appendItem(this)">
    `

    div.innerHTML = nhtml
}

function appendItem(input){
    if(event.key === 'Enter'){
        let data = getTodoList()

        let itemId = (function(){
            try{
                return data["TODO"][data["TODO"].length - 1].id + 1
            } catch {
                return 1
            }
        })()
        
        data['TODO'].push({name: input.value, status: "unchecked", id: itemId})

        updateDataAndDisplay(data)
    }
}

function getTodoList(){
    return (function(){
        if(localStorage.getItem('todo') != null) {
            return JSON.parse(localStorage.getItem('todo'))
        } else {
            return JSON.parse(`{
                "TODO" : []
            }`)
        }
    })()
}

window.onload = main