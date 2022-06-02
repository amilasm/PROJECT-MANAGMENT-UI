import api from "../axios";
const resource = '/api/admins';
const resource1 = '/api/admins/roles'

export default {
    getUsers: () => api.get(`${resource}`),
    getRoles: () => api.get(`${resource1}`),
    // createProduct: (payload) => api.post(`${resource}`, payload),
    // getProduct: (id) => api.get(`${resource}/${id}`),
    updateUser: (payload) => api.patch(`${resource}`, payload),
    deleteUser: (id) => api.delete(`${resource}/${id}`)
}