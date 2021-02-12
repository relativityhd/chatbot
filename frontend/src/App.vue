<template>
  <div id="app">
    <div class="chat">
      <cv-tile kind="standard" v-for="msg in chat" :key="msg.id">
        <h6>{{ msg.from }}</h6>
        <p>{{ msg.msg }}</p>
      </cv-tile>
    </div>
    <form v-on:submit.prevent="0">
      <cv-text-input label="Message" v-model="userMessage"> </cv-text-input>
      <cv-button @click="sendMessage">
        Send
      </cv-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      userMessage: '',
      chat: [],
      nums: 0
    }
  },
  methods: {
    sendMessage() {
      this.$socket.emit('msg', this.userMessage)
      this.chat.push({ from: 'user', msg: this.userMessage, id: this.nums })
      this.nums++
      this.userMessage = ''
    }
  },
  created() {
    this.$socket.on('res', (msg) => {
      this.chat.push({ from: 'bot', msg: msg, id: this.nums })
      this.nums++
    })
  }
}
</script>

<style lang="scss">
@import './styles/carbon';
</style>
