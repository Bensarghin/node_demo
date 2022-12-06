<template>
<div>
  <div>
    <div style="width: 25%;">
      <div class="offcanvas offcanvas-start show text-bg-dark" style="width: 25%;"  data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel">G-RDV</h5>
        </div>
        <div class="offcanvas-body">
              <ul>
                <li class="nav-item">
                  <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/rendezvous" class="nav-link">Rendez Vous</router-link>
                </li>
                <li>
                  <router-link to="/patients" class="nav-link">Patients</router-link>
                </li>
                <li>
                  <router-link to="/actes" class="nav-link">Actes</router-link>
                </li>
              </ul>
        </div>
      </div>
    </div>
    <div style="width: 75%;margin-left: 25%;">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  @import './assets/css/style.css'; 
</style>
