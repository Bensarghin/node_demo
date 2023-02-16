<template>
    <div>
        <div class="container my-5">
          <div class="row">
            <div class="col-sm-4">
              <div class="card text-light bg-primary">
                <div class="card-body">
                  <div class="text-center">
                    <h5>Users</h5>
                    <h1>14</h1>
                    </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card text-light bg-success">
                <div class="card-body">
                  <div class="text-center">
                    <h5>Users</h5>
                    <h1>14</h1>
                    </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card text-light bg-secondary">
                <div class="card-body">
                  <div class="text-center">
                    <h5>Users</h5>
                    <h1>14</h1>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios';
export default {

  name: 'HomeComponent',
  data () {
    return {
      dataList:{}
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata() {
      axios
      .get('http://localhost:4000/api/rendez_vs')
      .then(res => {
        this.dataList = res.data;
        console.log(res);
      })
    }
  }
}
</script>