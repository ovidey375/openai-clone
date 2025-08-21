import jwt from "jsonwebtoken";

export const userMiddleware = (req, res, next) => {
  const authId = req.headers.authorization;
  if (!authId || !authId.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No token provided" });
  }
  const token = authId.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    console.log(decoded);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ errors: "Invalid token or expired" });
  }
};

