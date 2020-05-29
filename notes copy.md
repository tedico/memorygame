### model

todos = []

my record with 3 fields
todo = { 
  id: 1,
  text: 'take dog for walk',
  done: false
}

add: adding a prop (immutable) using spread operator
const updatedTodo = {
  ...todo,
  category: 'job'
}

update: If I a prop already exists, the ...operator will updated (override) the existing value
catergory will now be animal instead of job

const updatedTodo = {
  ...todo,
  category: 'animal'
}

delete: destructuring + ...rest operator
I'm deleting the id prop.  todoWithoutId will return a record w/o the id prop

const { id, ...todoWithoutId } = updatedTodo

spread is RHS of assignment
rest is LHS of assignment


updating array (immutable)

const todoS = [{id: 1, text: 'eat ice cream', completed: false}, {id: 2, text: 'take nap', completed: false}]

const todo = {
  id: 3,
  text: 'take Snugs for walk',
  completed: false
}

adding item to array (immutable)
const updatedTodos = [...todos, todo] //this would be the immutable version of todoS.push(todo)

[].map((item)=> transformation Instructions here) remember () => is a function!

updating item in array (immutable)

const updatedTodoText = updatedTodos.map(updateText)

// whatever value is returned from this function will be used in the updated array. (works like reduce! whatever value is returned will be the next acc value used)
// I have two options: 1) if the if statement executes the updated description will be returned 2) or it will just return the same item which in effect does nothing - no change.

function updateText(todo) {
  if (todo.id == 2) {
    return {
      ...todo,
      description: 'Finish coding module'
    }
  }
  return todo
}

delete item in array (immutable)

const filteredTodos = updatedTodos.filter((todo) => todo.id !== 1) // this will remove 'eat ice cream' in the new array


RECAP

C [...todos, todo] I added an individual todo record {id: 69, text: 'write email', done: false }
R just return the array or return the individual item
U spread  will update if props exists otherwise it will create a prop or to update an array use [].map()
D use [].filter()

* We transform data in JS through functions! all of the functional methods expects a transformation function as a param

## The key to understanding [].reduce() is watching his [].map() again and pay attention to the updateText FN
# In [].reduce() whatever is returned will be the accumulator value for the next item (aka current)!!!!! I GOT IT!!!!!

partial application is specializing a more general function this is compostion in action
  greetCurry is general
    morningGreetingFunction is more specialized

for example:

function greetCurry(greeting) { is a general function
  //
}

we can make this more specialized by making a morning greeting function

const morningGreetingFunction = greetCurry('Good morning')
console.log(morningGreetingFunction('Snugs'))


currying is my function definition or function signature or creating functions w no data
partial application is when I actually consume/used/called/composed my curried function with data


order matters!!! The more general params first down to what composes a more specialized function
function greet(greeting) { // general first think of encapsulation and inheritance to understand what 
// makes something more specialized
  return function(name) {
    return `${greeting} ${name}` // ...then specialized
  }
}

the last piece of data should be the data my function is acting on for example: AHHHHHHH! I get it!!!

['Snugs', 'Charles', 'Gretel'].map(greetCurry('Good Afternoon'))

"the last piece of data should be the data my function is acting on" are the individual array items so that's the "last" params!!!!!!!!

apps are just data and transformations of that data through interactions on the view layer. And functions are the way I transform the data.
