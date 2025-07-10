import { os } from "./os";
import { planetRouter } from "./planet/router";

export const router = os.router({
    planet: planetRouter
})