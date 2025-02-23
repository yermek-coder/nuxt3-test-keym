import api from "./api";

class FruitService {
    getAll() {
        return api.get(`/api/fruit/all`)
    }
}

export default new FruitService()