# HOW TO USE THE DATABASE API

## Adding a task

* Send a POST request to `/api` with the task in the body
  * **Response**: Status code

## Getting task(s)

* Send a GET request to `/api`
  * **Response**: Array of ALL tasks

* Send a GET request to `/api/:id`
  * **Response**: JSON of the task with :id

## Updating a task

* Send a PUT request to `/api/:id` with the updated task in the body
  * **Response**: Status code

## Deleting a task

* Send a DELETE request to `/api/:id`
  * **Response**: Status code

### Task format

`{
  task: "taskName",
  importance: 1,
  completed: false
}`

* The task can be any string
* The importance can be 1-3
* The completed can be true or false
