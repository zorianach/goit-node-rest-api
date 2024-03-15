import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schemas/userSchemas.js";
import schemas from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as gravatar from "gravatar";
import Jimp from "jimp";
import crypto from "node:crypto";
import transport from "../helpers/sendEmail.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const avatarURL = gravatar.url(email);
    // console.log("avatarURL", avatarURL);

    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomUUID();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const verificationEmail = {
      to: email,
      from: "zoryanamirchuk@gmail.com",
      subject: "Welcome to Contact Book",
      html: `To confirm your registration please click on the <a href="http://localhost:3000/api/users/verify/${verificationToken}">link</a>`,
      text: `To confirm your registration please open the link http://localhost:3000/api/users/verify/${verificationToken}`,
    };

    await transport.sendMail(verificationEmail);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  const { token } = req.params;
//   console.log('req.params', req.params) 
// console.log('verificationToken', verificationToken)
  try {
    const user = await User.findOne({ verificationToken: token });

    console.log('user', user)
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

    res.send({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

const resendVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, 'User not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  const verificationEmail = {
    to: email,
    from: "zoryanamirchuk@gmail.com",
    subject: "Welcome to Contact Book",
    html: `To confirm your registration please click on the <a href="http://localhost:3000/api/users/verify/${user.verificationToken}">link</a>`,
    text: `To confirm your registration please open the link http://localhost:3000/api/users/verify/${user.verificationToken}`,
  };

  await transport.sendMail(verificationEmail);

  res.json({
    message: 'Verification email sent',
  });
};

export const login = async (req, res, next) => {
  validateBody(schemas.logInSchema);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    if (user.token) {
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };
    const { SECRET_KEY } = process.env;
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });
    console.log("token", token);
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      // token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { subscription, email } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json({ result });
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    // console.log("req.user", req.user);
    const { _id } = req.user;

    await Jimp.read(req.file.path)
      .then((image) => {
        image.resize(250, 250).write(`${req.file.path}`);
      })
      .catch((err) => {
        console.error(err);
        throw HttpError(401, "Not authorized");
      });

    const avatarsStorage = path.join(
      process.cwd(),
      "public/avatars",
      req.file.filename
    );

    await fs.rename(req.file.path, avatarsStorage);
    // console.log("filename", req.file);

    const avatarURL = path.join("avatars", req.file.filename);
    // console.log('avatarURL', avatarURL)
    const user = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    );
    if (!avatarURL) {
      throw HttpError(401, "Not authorized");
    }

    res.json({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  uploadAvatar,
  verify,
  resendVerify,
};
