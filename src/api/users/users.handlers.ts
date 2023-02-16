import { type Response, type Request, NextFunction } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { User, Users, UserWithId } from './users.model';

import { ObjectId } from 'mongodb';

export async function findAll(
  req: Request,
  res: Response<UserWithId[]>,
  next: NextFunction,
) {
  try {
    const users = await Users.find().toArray();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  req: Request<{}, UserWithId, User>, //first argument are the params (that are empty), the second is the response body, and the third argument is the request body
  res: Response<UserWithId>,
  next: NextFunction,
) {
  try {
    const result = await Users.insertOne(req.body);

    if (!result.acknowledged) throw new Error('Error inserting User');

    res.status(201).json({ ...req.body, _id: result.insertedId });
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, UserWithId, {}>,
  res: Response<UserWithId>,
  next: NextFunction,
) {
  try {
    const user = await Users.findOne({ _id: new ObjectId(req.params.id) });

    if (!user) {
      res.status(404);
      throw new Error(`User with id ${req.params.id} not found`);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, UserWithId, User>, //first argument are the params (that are empty), the second is the response body, and the third argument is the request body
  res: Response<UserWithId>,
  next: NextFunction,
) {
  try {
    const result = await Users.findOneAndUpdate(
      {
        _id: new ObjectId(req.params.id),
      },
      { $set: req.body },
      { returnDocument: 'after' },
    );

    if (!result.value) {
      res.status(404);
      throw new Error(`User with id ${req.params.id} not found`);
    }

    res.json(result.value);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(
  req: Request<ParamsWithId, {}, {}>, //first argument are the params (that are empty), the second is the response body, and the third argument is the request body
  res: Response<{}>,
  next: NextFunction,
) {
  try {
    const result = await Users.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });

    if (!result.value) {
      res.status(404);
      throw new Error(`User with id ${req.params.id} not found`);
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
