<template>
    <div>
        <h1>actes page</h1>
    </div>
</template>
<script>

import axios from 'axios';
export default {

  name: 'ActesComponent',
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