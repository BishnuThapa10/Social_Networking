
import jwt from "jsonwebtoken";

export const checkUser = (req, res, next) => {

const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ message: "No token provided" });

  // const token = authHeader.split(" ")[1]; // Bearer <token>

  // console.log(authHeader);

  try {
    const decoded = jwt.verify(token, 'secret'); // verify checks signature
    req.userId = decoded.id; // attach userId to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

}