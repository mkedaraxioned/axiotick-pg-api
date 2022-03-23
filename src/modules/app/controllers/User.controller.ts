import { RequestHandler, Request, Response } from "express";
import { createQueryBuilder, getManager } from "typeorm";
import { User } from "../../../entity/User";

export const loginUser: RequestHandler = async (
  req: Request | { [key: string]: any },
  res: Response
) => {
  try {
    const { id: oauthId, displayName: name, email, picture: avatar } = req.user;
    if (!oauthId || !name || !email) {
      return res.status(400).send({
        success: false,
        error: "Bad Request!",
      });
    }
    const userExists = await createQueryBuilder("User")
      .where("User.googleId = :googleId", {
        googleId: oauthId,
      })
      .getOne();

    if (userExists) {
      return res.status(200).send({
        success: true,
        message: "Logged In!",
      });
    }
    let data: {
      name: string;
      email: string;
      googleId: string;
      avatar?: string;
    } = {
      name,
      email,
      googleId: oauthId,
    };
    if (avatar) {
      data = {
        ...data,
        avatar,
      };
    }
    const userRepository = getManager().getRepository(User);

    const user = userRepository.create({
      ...data,
    });

    await userRepository.save(user);
    return res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error,
    });
  }
};

export const getProfile: RequestHandler = async (
  req: Request | { [key: string]: any },
  res: Response
) => {
  try {
    const { displayName, name, id: userId } = req.user;
    if (!displayName || !name || !userId) {
      return res.status(404).send({
        success: false,
        error: "Not found",
      });
    }
    return res.status(200).send({
      success: true,
      displayName,
      name,
      userId,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error,
    });
  }
};

export const logoutUser: RequestHandler = async (req, res) => {
  try {
    req.logout();
    req.session.destroy(() => null);
    return res.status(200).send({
      success: true,
      message: "Logged out!",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error,
    });
  }
};

export const updateUser: RequestHandler = async (
  req: Request | { [key: string]: any },
  res: Response
) => {
  try {
    const { name, phone, avatar, syncAvatar } = req.body;
    // Actual use case
    // const {
    //   picture,
    // } = req.user;
    const { id: userId } = req.params;
    let updateData: { name?: string; phone?: string; avatar?: string } = {};
    const userRepository = getManager().getRepository(User);
    const userExists = await userRepository.findOne(userId);
    if (!userExists) {
      return res.status(404).send({
        success: false,
        error: "User Not Found",
      });
    }
    if (name || phone || avatar || syncAvatar) {
      if (name) updateData.name = name;
      if (phone) updateData.phone = phone;
      if (avatar) updateData.avatar = avatar;
    }

    // Actual use case
    // if(syncAvatar) {
    //   updateData.avatar = picture;
    // }
    await userRepository.update(userId, updateData);
    return res.status(200).send({
      success: true,
      message: "User Updated!",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error,
    });
  }
};
