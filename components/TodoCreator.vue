<template>
    <div>
        <button @click="createdTodo">추가</button>
        <input
        :value="title"
        :placeholder="placeholder"
        type="text"
        @input="title = $event.target.value"
        @keypress.enter="createdTodo">
    </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      placeholder: '할 일 추가'
    }
  },
  methods: {
    createdTodo () {
      const validatedTitle = this.title && this.title.trim()

      if (!validatedTitle) {
        alert('입력하신 내용을 확인해주세요')
        this.title = this.title.trim()
        return
      }
      this.$emit('create-todo', this.title)
      this.title = ''
    }
  }
}
</script>
