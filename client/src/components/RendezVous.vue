<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Rendez vous</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            <button type="button" class="btn btn-primary" @click="modifierRdv()">Valider</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="margin-top:60px">
      <h3 class="text-muted my-3">Rendez Vous</h3>      
      <div class="card shadow-sm ">
        <div class="card-body">
          <table class="table table-striped text-center">
            <thead class="bg-dark text-light">
              <th>Nom</th>
              <th>Prenom</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Date RDV</th>
              <th>L'Acte</th>
              <th>Etat</th>
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
                  <td><a class="btn btn-success btn-sm" v-if="data.status == 'Passé'" @click="Modifier_Status(data._id)"> {{data.status}} &#10003;</a>
                  <a class="btn btn-secondary btn-sm" v-if="data.status == 'En attente'" @click="Modifier_Status(data._id)"> {{data.status}} &#9675;</a>
                  <a class="btn btn-primary btn-sm" v-if="data.status == 'En cours'" @click="Modifier_Status(data._id)"> {{data.status}} ..</a></td>
                  <td><a href="" class="btn btn-dark btn-sm" @click="modifierRdv(data._id)">Modifier</a>   <a href="" class="btn btn-light btn-sm" @click="DeleteRdv(data._id)">Supprimer</a></td>
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
      dataList:{},
      statusColor:'success',
      acte:'',
      daterdv:''
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
    },
    Modifier_Status(id){
      axios
      .put('http://localhost:4000/api/rendez_vs/status/'+id)
      .then(res => {
        console.log(res.data)
        this.getdata()})
      },
       // delete request
    DeleteRdv(id) {
      if(confirm('Vous etes sure !???')){
      axios
      .delete('http://localhost:4000/api/rendez_vs/'+id)
      .then(res => {
        this.dataList = res.data;
        console.log(res);
        this.getdata();
      })
      }
    },
    modifierRdv(id){
      axios
      .put('http://localhost:4000/api/rendez_vs/'+id, {
        // Les nouvelles valeurs qui viennent du formulaire
        date_rdv: this.daterdv,
        acte: this.acte
      })
      .then( resultat => {
          this.dataList = resultat.data;
          console.log(resultat);
          this.getdata();
      } )
    }
  }
}
</script>
