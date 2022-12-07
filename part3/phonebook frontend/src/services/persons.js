import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () =>
{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) =>
{
    const request = axios.post(baseUrl,newPerson)
    return request.then(response => response.data)
}

const update = (id, updatedPerson) =>
{
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

const remove = (id) =>
{ 
    return axios.delete(`${baseUrl}/${id}`)
    .then(response => console.log('success!'))
    .catch(error => console.log('fail'))
}

const allMethods = {getAll, create, update, remove}

export default allMethods;
