console.log("Yew 🤘🏄")

let todos = []
console.log("initial state", todos)

todos = [
{id: 1, item: "Take Snugs for a walk", completed: false},
{id: 2, item: "Take Gretel for a walk", completed: false},
{id: 3, item: "Take Charles for a walk", completed: false},
{id: 4, item: "Take Bikini for a walk", completed: false},
{id: 5, item: "Take Luna for a walk", completed: false},
]
// create a function that returns an object that represents a todo item
// and then updated an array [{id: 1, item: "take Snugs for a walk", completed: false }]
function createTodo(model, id, item, completed = false) {
  let updatedModel = [...model]
  const todo = {
    id,
    item,
    completed
  }
  return updatedModel = [...updatedModel, todo]
}
console.log("updated state", todos )


// create a function that will read/get a todo from an array
// [{ id: 1, item: 'Take Snugs for a walk', completed: false }]
// There are no state changes in this function. I'm just reading from my model
function getTodo(model, todo) {
  const item = model.filter((object) => object.item === todo)
  return item.length > 0 ? item : "Try searching again. Todo item not found."
}

// create a function that will Update todo. This returns an updated model
function updateTodo(model, id, item) {
  // I think map would be better for this actually
  return model.map((object) => {
    if (object.id != id) {
      return object
    } else {
      return {
        ...object,
        item,
        completed: true
      }
    }
  })
}

// create a function that would delete a single todo item
function deleteTodo(model, id) {

}

// create a function that would delete all todos
function deleteAllTodos(model) {

}

console.log(updateTodo(todos, 3, "Give Snugs treat"))
