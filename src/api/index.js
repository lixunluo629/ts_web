import Axios from 'axios';

Axios.defaults.baseURL='http://127.0.0.1:8000/server'

export function getInfo(){
  return Axios.get('/info/?sid=1')
}

export function actUser(data){
  return Axios.post('/action/', data)
}

export function getCos(){
  return Axios.get('/getCos')
}
