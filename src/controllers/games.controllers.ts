import { db } from "../database/database.js"
import { Request, Response } from 'express';


export async function listGames(req: Request, res: Response) {
  try {
    const games = await db.query("SELECT * FROM games")
    res.send(games.rows)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function registerGame(req: Request, res:Response) {
  const { name, situation, price } = req.body

  const registeredGame = await db.query(`SELECT * FROM games WHERE name = '${name}'`)

  if (registeredGame.rows.length != 0) return res.status(409).send('Game already registered')

  try {
    await db.query(`INSERT INTO games (name, status, price) VALUES ('${name}', '${situation}', '${price}')`)
    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function updateGame(req: Request, res:Response) {
  const { id } = req.params;
  const { situation } = req.body

  const game = await db.query(`SELECT * FROM games WHERE id = ${id}`);

	if (game.rows.length == 0)
		return res.status(404).send('Game does not exist');

  try {
    await db.query(`UPDATE games SET situation='${situation}' WHERE id = ${id};`)
    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function deleteGame(req: Request, res:Response) {
  const { id } = req.params;

	const game = await db.query(`SELECT * FROM games WHERE id = ${id}`);

	if (game.rows.length == 0)
		return res.status(404).send('Game does not exist');

	await db.query(`DELETE FROM games WHERE id = ${id}`);

	res.sendStatus(200);
}