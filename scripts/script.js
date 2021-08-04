// alert("hello!");

// document.querySelector("#new-todo").addEventListener("submit", (e) => {
//     e.preventDefault();
//     const text = e.target.elements.text.value.trim();
//     alert(text);
// })

// const el = document.querySelector(".button");
// el.style.backgroundColor = "green";

const el = document.querySelector("#new-todo")

el.addEventListener("submit", (event) => {
    event.preventDefault()
    const text = event.target.elements.text.value.trim()

    if (text.length > 0) {
        createTodo(text)
        event.target.elements.text.value = ""
    }

    renderTodos(todos)
})

const todos = []

const createTodo = (text) => {
    todos.push({
        title: text,
        completed: false
    })
}

const generateTodoDOM = (todoObj) => {
    const todoEl = document.createElement("label")
    const containerEl = document.createElement("div")
    const todoText = document.createElement("span")
    //Exercise 12:
    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.checked = todoObj.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener("change", () => {
        toggleTodo(todoObj.title)
        renderTodos(todos)
    })

 // Setup the todo text
 todoText.textContent = todoObj.title
 containerEl.appendChild(todoText)

 // Setup container
 todoEl.classList.add("list-item")
 containerEl.classList.add("list-item__container")
 todoEl.appendChild(containerEl)

 // Setup the remove button
 const removeButton = document.createElement("button")
 removeButton.textContent = "remove"
 removeButton.classList.add("button", "button--text")
 todoEl.appendChild(removeButton)
 removeButton.addEventListener("click", () => {
     removeTodo(todoObj.title)
     renderTodos(todos)
 })

 return todoEl
}

//Exercise 13
const toggleTodo = (title) => {
    const todo = todos.find((todo) => todo.title.toLowerCase() === title.toLowerCase())

    if (todo) {
        todo.completed = !todo.completed
    }
}

const removeTodo = (title) => {
    const todoIndex = todos.findIndex((todo) => todo.title.toLowerCase() === title.toLowerCase())

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

//Exercise 14
const filters = {
    searchTitle: "",
    showFinished: false,
    showUnfinished: false
}

//Exercise 15
const setFilters = (updates) => {
    if (typeof updates.searchTitle === "string") {
        filters.searchTitle = updates.searchTitle
    }
    if (typeof updates.showFinished === "boolean") {
        filters.showFinished = updates.showFinished
    }
    if (typeof updates.showUnfinished === "boolean") {
        filters.showUnfinished = updates.showUnfinished
    }
}

//Exercise 16
document.querySelector("#search-text").addEventListener("input", (e) => {
    setFilters({
        searchTitle: e.target.value
    })
    renderTodos(todos)
})

document.querySelector("#show-finished").addEventListener("change", (e) => {
    setFilters({
        showFinished: e.target.checked
    })
    renderTodos(todos)
})

// Render application todos based on filters
const renderTodos = (todos) => {
    // filtered Todos
    let filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(filters.searchTitle.toLowerCase()))
    if(filters.showFinished && filters.showUnfinished) {
      // do nothing
    } else if(filters.showFinished) {
      filteredTodos = filteredTodos.filter((todo) => todo.completed)
    } else if(filters.showUnfinished) {
      filteredTodos = filteredTodos.filter((todo) => !todo.completed)
    }
    
    const todoList = document.querySelector('#todos')
    todoList.innerHTML = ''

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no todos to show'
        todoList.appendChild(messageEl)
    }
}
renderTodos(todos)

// const removeTodo = (todoEl) => {
//     const todoIndex = todos.findIndex((todo) => {
//         return todo.toLowerCase() === todoEl.textContent.toLowerCase()
//     })
//     if (todoIndex > -1) {
//         todos.splice(todoIndex, 1)
//     }
// }


