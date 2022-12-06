<template>

  <div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Ajouter un acte</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <input class="form-control" type="text" placeholder="Nom acte" v-model="nom">
            </div>
            <div class="mb-3">
              <textarea name="" placeholder="Description" id="" class="form-control" cols="30" rows="10" v-model="description"></textarea>
            </div>
            <div class="input-group mb-3">
              <input type="number" class="form-control" placeholder="Prix" v-model="prix" aria-describedby="basic-addon2">
              <span class="input-group-text" id="basic-addon2">.00 DH</span>
            </div>
            <div class="input-group mb-3">
              <input type="number" class="form-control" placeholder="Durée" v-model="duree" aria-describedby="basic-addon2">
              <span class="input-group-text" id="basic-addon2">heure</span>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="close" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="modActe()">Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="margin-top:60px">
      <h3 class="text-muted my-3">Actes</h3>
      <a class="btn btn-primary my-3" @click="emptyActe()" data-bs-toggle="modal" data-bs-target="#exampleModal">Ajouter</a>
          <div class="row">
            <div class="col-4 mb-3" v-for="data in dataList" :key="data._id">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title text-capitalize">{{data.nom}}</h4>
                  <p class="card-text text-capitalize">{{data.description}} - 
                  <span class="text-muted">{{data.duree}} h</span></p>
                  <p class="text-secondary">{{data.prix}}.00 DH</p>
                  <a @click="fillActe(data)" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Modifier</a>  <a @click="DeleteActe(data._id)" class="btn btn-secondary"> Supprimer </a>
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

  name: 'ActesComponent',
  data () {
    return {
      dataList:{},
      id: '',
      nom : '',
      description : '',
      duree : '',
      prix : '',
      update: false
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata() {
      axios
      .get('http://localhost:4000/api/actes')
      .then(res => {
        this.dataList = res.data;
        console.log(res);
      })
    },
    modActe() {
      // put request
      if(this.update) {
      axios
      .put('http://localhost:4000/api/actes/'+this.id,{
        nom : this.nom,
        description : this.description,
        duree : this.duree,
        prix : this.prix
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
      .post('http://localhost:4000/api/actes',{
        nom : this.nom,
        description : this.description,
        duree : this.duree,
        prix : this.prix
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
    emptyActe() {
      this.update = false;
      this.nom = '';
      this.description = '';
      this.duree = '';
      this.prix = '';
    },
    fillActe(data) {
      this.update = true;
      this.id = data._id;
      this.nom = data.nom;
      this.description = data.description;
      this.duree = data.duree;
      this.prix = data.prix;
    },
    // delete request
    DeleteActe(id) {
      if(confirm('Vous etes sure !???')){
      axios
      .delete('http://localhost:4000/api/actes/'+id)
      .then(res => {
        this.dataList = res.data;
        console.log(res);
        this.getdata();
      })
      }
    }
  }
}
</script>