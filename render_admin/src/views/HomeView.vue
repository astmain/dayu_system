<template>
  <div class="home">
    <h1>Welcome to Home Page</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

button {
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c82333;
}
</style> 