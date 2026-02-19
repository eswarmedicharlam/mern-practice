import { Request, Response, NextFunction } from "express";
import { IUser, UserModel } from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";


interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const registerUser = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response<{ token: string }>,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser: IUser | null =
      await UserModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ token: "Email already exists" });
      return;
    }

    const hashedPassword: string =
      await hashPassword(password);

    const user: IUser = await UserModel.create({
      name,
      email,
      password: hashedPassword
    });

    const token: string = generateToken({
      userId: user._id.toString(),
      role: user.role
    });

    res.status(201).json({ token });

  } catch (error: unknown) {
    next(error);
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginBody>,
  res: Response<{ token: string }>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user: IUser | null =
      await UserModel.findOne({ email });

    if (!user) {
      res.status(401).json({ token: "Invalid credentials" });
      return;
    }

    const isMatch: boolean =
      await comparePassword(password, user.password);

    if (!isMatch) {
      res.status(401).json({ token: "Invalid credentials" });
      return;
    }

    const token: string = generateToken({
      userId: user._id.toString(),
      role: user.role
    });

    res.status(200).json({ token });

  } catch (error: unknown) {
    next(error);
  }
};
