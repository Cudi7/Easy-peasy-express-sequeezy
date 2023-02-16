import { Unicorn, Unicorns, type UnicornWithId } from './unicorns.model';
import { type Response, type Request, NextFunction } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { ObjectId } from 'mongodb';

export async function findAll(
  req: Request,
  res: Response<UnicornWithId[]>,
  next: NextFunction,
) {
  try {
    const unicorns = await Unicorns.find().toArray();
    res.json(unicorns);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  req: Request<{}, UnicornWithId, Unicorn>, //first argument are the params (that are empty), the second is the response body, and the third argument is the request body
  res: Response<UnicornWithId>,
  next: NextFunction,
) {
  try {
    const result = await Unicorns.insertOne(req.body);

    if (!result.acknowledged) throw new Error('Error inserting Unicorn');

    res.status(201).json({ ...req.body, _id: result.insertedId });
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, UnicornWithId, {}>, //first argument are the params, the second is the response body, and the third argument is the request body
  res: Response<UnicornWithId>,
  next: NextFunction,
) {
  try {
    const unicorn = await Unicorns.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!unicorn) {
      res.status(404);
      throw new Error(`Unicorn with id ${req.params.id} not found`);
    }

    res.json(unicorn);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, UnicornWithId, Unicorn>, //first argument are the params, the second is the response body, and the third argument is the request body
  res: Response<UnicornWithId>,
  next: NextFunction,
) {
  try {
    const result = await Unicorns.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      {
        returnDocument: 'after',
      },
    );

    if (!result.value) {
      res.status(404);
      throw new Error(`Unicorn with id ${req.params.id} not found`);
    }

    res.json(result.value);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(
  req: Request<ParamsWithId, {}, {}>, //first argument are the params, the second is the response body, and the third argument is the request body
  res: Response<{}>,
  next: NextFunction,
) {
  try {
    const result = await Unicorns.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    if (!result.value) {
      res.status(404);
      throw new Error(`Unicorn with id ${req.params.id} not found`);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
