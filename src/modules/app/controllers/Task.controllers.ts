import { RequestHandler, Request, Response } from "express";
import { createQueryBuilder, getManager } from "typeorm";
import { Project } from "../../../entity/Project";
import { Task } from "../../../entity/Task";
import { User } from "../../../entity/User";

export const createTask: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { endDate, members, projectId, startDate, title, userId } = req.body;
    // const { id: userId } = req.params;
    if (!title) {
      return res.status(400).send({
        success: false,
        error: "Please provide required fields",
      });
    }
    if (!projectId || typeof projectId !== "number") {
      return res.status(400).send({
        success: false,
        error: "Please provide valid project",
      });
    }
    if (userId && typeof userId !== "number") {
      return res.status(400).send({
        success: false,
        error: "Please provide valid user",
      });
    }
    const userRepository = getManager().getRepository(User);
    if (userId) {
      const userExists = await userRepository.findOne(userId);
      if (!userExists) {
        return res.status(400).send({
          success: false,
          error: "Please provide a valid user/owner",
        });
      }
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).send({
        success: false,
        error: "Please provide valid startdate and enddates",
      });
    }
    const projectRepository = getManager().getRepository(Project);
    const projectExists = await projectRepository.findOne(projectId);
    if (!projectExists) {
      return res.status(400).send({
        success: false,
        error: "Please enter a valid project",
      });
    }
    const taskRepository = getManager().getRepository(Task);
    let data: Task = {
      ...req.body,
    };
    if (members && members.length > 0) {
      const users = await userRepository.findByIds(members);
      if (!users || users.length !== members.length) {
        return res.status(400).send({
          success: false,
          error: "Please enter a valid members",
        });
      }
      if (users.length) {
        data = {
          ...data,
          members: users,
        };
      }
    }

    const task = taskRepository.create({
      ...data,
    });

    await taskRepository.save(task);
    return res.status(200).send({
      success: true,
      task,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error,
    });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const taskRepository = getManager().getRepository(Task);
    const tasks = await taskRepository.find();
    const populatedTasks = await createQueryBuilder("Task")
      .leftJoinAndSelect("Task.members", "user")
      .getMany();
    return res.status(200).send({
      sucess: true,
      tasks,
      populatedTasks,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error,
    });
  }
};
