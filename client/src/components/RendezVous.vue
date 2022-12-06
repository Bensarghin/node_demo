<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="margin-top:60px">
      <h3 class="text-muted my-3">Rendez Vous</h3>      
      <div class="card">
        <div class="card-body">
          <table class="table table-striped text-center">
            <thead class="bg-dark text-light">
              <th>Nom</th>
              <th>Prenom</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Date RDV</th>
              <th>Etat</th>
              <th>Acte</th>
              <th></th>
            </thead>
            <tbody>
              <tr v-for="data in dataList" :key="data._id">
                  <td>{{data.patient.nom}}</td>
                  <td>{{data.patient.prenom}}</td>
                  <td>{{data.patient.age}}</td>
                  <td>{{data.patient.sex}}</td>
                  <td>{{data.date_rdv}}</td>
                  <td>{{data.acte.nom}}</td>
                  <td><a class="btn btn-success btn-sm"> {{data.status}}</a></td>
                  <td><a href="" class="btn btn-secondary btn-sm">Modifier</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
</template>
<script>

import axios from 'axios';

export default {
  name: 'RendezVous',
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
