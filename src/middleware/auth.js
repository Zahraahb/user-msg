import jwt from "jsonwebtoken";
import userModel from "../../db/models/user.model.js";

//fwye__
export const auth = () => {
  return async (req, res, next) => {
    try {
      const { token } = req.headers;
      if (!token) {
        return res.status(409).json({ msg: "token not exist!" });
      }
      if (!token.startsWith("fwye__")) {
        return res.status(409).json({ msg: "token not exist!" });
      }
      const newToken = token.split("fwye__")[1];
      if (!newToken) {
        return res.status(409).json({ msg: "token not exist!" });
      }
      const decoded = jwt.verify(newToken, "zwzq");
      if (!decoded.id) {
        return res.status(409).json({ msg: "invalid payload!" });
      }
      const user = await userModel.findById(decoded.id);

      if (!user) {
        return res.status(409).json({ msg: "invalid user!" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(409).json({ msg: "catch error", error });
    }
  };
};
