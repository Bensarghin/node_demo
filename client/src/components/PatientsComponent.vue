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
            <div class="mb-3">
              <input class="form-control" type="text" placeholder="Nom patient" v-model="nom">
            </div>
            <div class="mb-3">
              <input name="" placeholder="Prenom" id="" class="form-control" v-model="prenom">
            </div>
            <div class="mb-3">
              <input type="number" class="form-control" placeholder="age" v-model="age" >
            </div>
            <div class="mb-3">
              <input type="tele" class="form-control" placeholder="tele" v-model="tele">
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" v-model="sex" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="homme">
              <label class="form-check-label" for="inlineRadio1">Homme</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" v-model="sex" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="femme">
              <label class="form-check-label" for="inlineRadio2">Femme</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="close" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="modPatient()">Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="rdvModal" tabindex="-1" aria-labelledby="rdvModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="rdvModalLabel">Rendez vous</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="exampleSelect">Date Rendez Vous:</label>
              <input class="form-control" type="date" v-model="date_rdv">
            </div>
            <label for="exampleSelect">l'Acte</label>
            <div class="mb-3">
              <select class="form-control" v-model="acte" id="exampleSelect">
                <option selected>....</option>
                <option :value="data._id" v-for="data in actes" :key="data._id">{{data.nom}}</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="close" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="AddRdv()">Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="margin-top:60px">
      <h3 class="text-muted my-3">Patients</h3>
      <button type="button" class="btn btn-primary my-3" @click="emptyPatient()" data-bs-toggle="modal" data-bs-target="#exampleModal">Ajouter</button>

      <div class="card">
        <div class="card-body">
          <table class="table table-striped text-center">
            <thead class="bg-dark text-light">
            <tr>
              <td>#</td>
              <td></td>
              <td>Nom</td>
              <td>Prenom</td>
              <td>Age</td>
              <td>Sex</td>
              <td></td>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in dataList" :key="data._id">
                <td>{{(index+1)}}</td>
                <td>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="patient" :value="data._id" name="patiient[]">
                  </div>
                </td>
                <td>{{data.nom}}</td>
                <td>{{data.prenom}}</td>
                <td>{{data.age}}</td>
                <td>{{data.sex}}</td>
                <td>
                  <a @click="fillPatient(data)" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Modifier</a>     
                  <a @click="DeletePatient(data._id)" class="btn btn-secondary mx-2"> Supprimer </a>                </td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-success" @click="AddRdv()" data-bs-toggle="modal" data-bs-target="#rdvModal">Ajouter RDV</button>
        </div>
      </div>
    </div>
    </div>
</template>



<script lang="js">

import axios from 'axios';

export default {

name: 'patientsComponent',
data () {
  return {
    dataList:{},
    errors:{},
    patient:[],
    actes:[],
    acte: '',
    date_rdv:'',
    id: '',
    nom : '',
    prenom : '',
    age : '',
    sex : '',
    tele: '',
    update: false
  }
},
created() {
  this.getdata();
  this.getactes();
},
methods: {
  getdata() {
    axios
    .get('http://localhost:4000/api/patients')
    .then(res => {
      this.dataList = res.data;
      console.log(res);
    })
  },
  getactes() {
    axios
    .get('http://localhost:4000/api/actes')
    .then(res => {
      this.actes = res.data;
      console.log(res);
    })
  },
  modPatient() {
    // put request
    if(this.update) {
    axios
    .put('http://localhost:4000/api/patients/'+this.id,{
      nom : this.nom,
      prenom : this.prenom,
      age : this.age,
      sex : this.sex,
      tele: this.tele
    })
    .then(res => {
      this.dataList = res.data;
      console.log(res);
      this.getdata();
      const close = document.getElementById('close');
      close.click();
    })
      
    }
    // put request
    else {
    axios
    .post('http://localhost:4000/api/patients',{
      nom : this.nom,
      prenom : this.prenom,
      age : this.age,
      sex : this.sex,
      tele: this.tele
    })
    .then(res => {
      this.dataList = res.data;
      console.log(res);
      this.getdata();
      const close = document.getElementById('close');
      close.click();
    })
      
    }
  },
  // fill in fields
  emptyPatient() {
    this.update = false;
    this.nom = '';
    this.prenom = '';
    this.age = '';
    this.sex = '';
    this.tele = '';
  },
  fillPatient(data) {
    this.update = true;
    this.id = data._id;
    this.nom = data.nom;
    this.prenom = data.prenom;
    this.age = data.age;
    this.sex = data.sex;
    this.tele = data.tele;
  },
  // delete request
  DeletePatient(id) {
    if(confirm('Vous etes sure !???')){
    axios
    .delete('http://localhost:4000/api/patients/'+id)
    .then(res => {
      this.dataList = res.data;
      console.log(res);
      this.getdata();
    })
    }
  },
  // post rendez vous 
  AddRdv() {
    axios
    .post('http://localhost:4000/api/rendez_vs',{
      date_rdv : this.date_rdv,
      acte : this.acte,
      patient : this.patient
    })
    .then(res => {
      this.errors = res.data;
      console.log(res);
      this.getdata();
      const close = document.getElementById('close');
      close.click();
    })
  }
}
}
</script>
