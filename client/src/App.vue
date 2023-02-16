<template>
<div>

  <!-- Full screen modal -->
    <div class="modal fade show" id="authModal" style="display:block" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
            <div class="modal-body">
              <div class="container ">
                <div class="col-sm-6 m-auto my-5 bg-primary p-5">
                  <h3 class="text-center text-light">Welcome ADMIN</h3>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="text-light">Login</label>
                    <input type="text" class="form-control form-control-lg" id="login" placeholder="user login" required>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="text-light">Password</label>
                    <input type="password" class="form-control form-control-lg" id="psw" placeholder="***********" required>
                  </div>
                  <div class="mb-3">
                    <div class="btn btn-dark btn-lg w-100" @click="auth()">Authentification</div>
                  </div>
                </div>             
              </div>
            </div>
        </div>
      </div>
    </div>
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
                 <li>
                  <a href="#" @click="logout()" class="nav-link">Logout</a>
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
</template>

<script>

export default {
  name: 'App',
  components: {},
  methods: {
    auth() {
      var psw =  document.getElementById('psw').value;
      var lgn =  document.getElementById('login').value;
      if(psw == "admin" && lgn == "admin" && lgn != " " && psw != " ") {
        document.getElementById('authModal').style.display = "none";
      }
      else {
        alert('User login or password are invalid!!')
      }
    },
    logout() {
      document.getElementById('psw').value = "";
      document.getElementById('login').value = "";
        document.getElementById('authModal').style.display = "block";
    }
  }
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
