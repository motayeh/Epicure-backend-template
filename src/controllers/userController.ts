import jwt from 'jsonwebtoken';
import { error } from 'console';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import mongoose, { Aggregate } from 'mongoose';
import UserService from '../services/users.service';
type userDeatils = {
  userName: string;
  email: string;
};
export interface userDatas extends Request {
  userData: userDeatils;
}
export default class userController {
  public static async signUp(req: userDatas, res: Response) {
    const use = req.body;
    try {
      const user = req.headers.authorization?.split(' ')[1];
      if (!user) {
        throw new Error('Authintication failed!');
      }

      const decodedUser = jwt.verify(user, 'Secret Data');
      req.userData = { userName: user, email: user };
      const service = new UserService();
      const users = await service.createUser(decodedUser);
      res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public static async logIn(req: Request, res: Response) {
    try {
      const user = req.body;
      const service = new UserService();
      const userLogged = await service.logIn(user);
      res.status(200).send(userLogged);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  public static async getUsers(req: Request, res: Response) {
    const service = new UserService();
    const restaurants = await service.getUser();
    return res.send(restaurants);
  }
}
