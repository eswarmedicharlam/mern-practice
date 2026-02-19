import jwt from "jsonwebtoken";

interface TokenPayload {
    userId: string;
    role: string;
}

export const generateToken = (payload: TokenPayload): string => {
    const secret: string | undefined = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET not defined");
    }
    return jwt.sign(payload, secret, {
        expiresIn: "15m"
    });
};
