import type { Fruit } from "~/types/fruit";
import api from "./api";

class FruitService {
    getAll(): Promise<Fruit[]> {
        return api.get("fruit/all")
    }

    getByFamily(family: string): Promise<Fruit[]> {
        return api.get("fruit/family/" + family)
    }
}

export default new FruitService()