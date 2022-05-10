import axios from 'axios'

const API = axios.create({
     baseURL:'http://68.183.183.118:4088/api/v1/articles'
})

export default API