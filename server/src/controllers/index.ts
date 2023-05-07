import { Request, Response, NextFunction } from 'express';
// import { fetchExampleData } from '../services';

export async function getExampleData(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // const data = await fetchExampleData();
    // res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
