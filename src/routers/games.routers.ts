import { Router } from "express";
import { deleteGame, listGames, registerGame, updateGame } from "../controllers/games.controllers.js";
import { gamesSchema, gamesUpdateSchema } from "../models/games.model.js"
import { validateSchema } from "../middlewares/validadeSchema.middleware.js";

const gamesRouter = Router()

gamesRouter.get('/games', listGames)
gamesRouter.post('/games',validateSchema(gamesSchema), registerGame)
gamesRouter.put('/games/:id',validateSchema(gamesUpdateSchema), updateGame)
gamesRouter.delete('/games/:id', deleteGame)

export default gamesRouter

