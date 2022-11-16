import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>
{
    const request = axios.get(baseUrl)
    return request.then(response => {
        response.data
        console.log('success!')})
    .catch(error => console.log('retrieve fail'))
}

const create = (newPerson) =>
{
    const request = axios.post(baseUrl,newPerson)
    return request.then(response => {
        response.data
        console.log('success!')})
    .catch(error => console.log('create fail'))
}

const update = (id, updatedPerson) =>
{
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => {
        response.data
        console.log('success!')})
    .catch(error => console.log('create fail'))
}

const remove = (id) =>
{ 
    return axios.delete(`${baseUrl}/${id}`)
    .then(response => console.log('success!'))
    .catch(error => console.log('fail'))
}

const allMethods = {getAll, create, update, remove}

export default allMethods;
