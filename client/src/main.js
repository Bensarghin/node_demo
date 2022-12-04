import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import Actes from './components/ActesComponent.vue';
import RendezVous from './components/RendezVous.vue';
import Patients from './components/PatientsComponent.vue';
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        path: '/rendezvous',
        component: RendezVous
    },
    {
        path: '/patients',
        component: Patients
    },
    {
        path: '/actes',
        component: Actes
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
