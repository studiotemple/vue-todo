<template>
    <div>
        <todo-item
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"

          @update-todo="updateTodo"
          @delete-todo="deleteTodo"
        />

        <hr />

        <todo-creator @create-todo="createTodo"/>
    </div>
</template>

<script>
import lowdb from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'
import _cloneDeep from 'lodash/cloneDeep'
import _find from 'lodash/find'
// eslint-disable-next-line no-unused-vars
import _assign from 'lodash/assign'
import TodoCreator from './TodoCreator'
import TodoItem from './TodoItem'

export default {
  components: {
    TodoCreator,
    TodoItem
  },
  data () {
    return {
      db: null,
      todos: []
    }
  },
  created () {
    this.initDB()
  },
  methods: {
    initDB () {
      const adapter = new LocalStorage('todo-app')
      this.db = lowdb(adapter)

      console.log(this.db)

      const hasTodos = this.db.has('todos').value()

      if (hasTodos) {
        // eslint-disable-next-line no-undef
        this.todos = _cloneDeep(this.db.getState().todos)
      } else {
        // Local DB 초기화
        this.db
          .defaults({
            todos: [] // Collection
          })
          .write()
      }
    },
    createTodo (title) {
      const newTodo = {
        id: cryptoRandomString({ length: 10 }),
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false
      }

      // DB에 쓰고
      this.db
        .get('todos') // lodash
        .push(newTodo) // lodash
        .write() // lowdb

      // 화면에 갱신
      this.todos.push(newTodo)
    },
    updateTodo (todo, value) {
      this.db
        .get('todos') // lodash
        .find({ id: todo.id }) // lodash
        .assign(value)
        .write() // lowdb

      const foundTodo = _find(this.todos, { id: todo.id })
      Object.assign(foundTodo, value)
    },
    deleteTodo () {
      console.log('deleteTodo')
    }
  }
}
</script>
