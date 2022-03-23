import { RequestHandler, Request, Response } from "express";
import { createQueryBuilder, getManager } from "typeorm";
import { Project } from "../../../entity/Project";
import { Task } from "../../../entity/Task";
import { User } from "../../../entity/User";

export const createProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      billingType,
      clientName,
      members,
      tasks,
      timeBudget,
      title,
      ownerId,
    } = req.body;
    // const { id: userId } = req.params;
    if (!title) {
      return res.status(400).send({
        success: false,
        error: "Please provide required fields",
      });
    }

    if (!ownerId || typeof ownerId !== "number") {
      return res.status(400).send({
        success: false,
        error: "Please provide valid owner",
      });
    }
    const userRepository = getManager().getRepository(User);
    const taskRepository = getManager().getRepository(Task);
    const projectRepository = getManager().getRepository(Project);
    const owner = await userRepository.findOne(ownerId);
    if (!owner) {
      return res.status(400).send({
        success: false,
        error: "Please provide valid owner of project",
      });
    }

    let data: Project = {
      ...req.body,
    };
    if (members && members.length > 0) {
      const users = await userRepository.findByIds(members);
      if (users.length !== members.length) {
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

    if (tasks && tasks.length > 0) {
      const tasksAdded = await taskRepository.findByIds(tasks);
      if (tasksAdded.length !== tasks.length) {
        return res.status(400).send({
          success: false,
          error: "Please enter a valid Tasks",
        });
      }
      if (tasksAdded.length) {
        data = {
          ...data,
          tasks: tasksAdded,
        };
      }
    }
    const project = projectRepository.create({
      ...data,
    });

    await projectRepository.save(project);

    return res.status(200).send({
      success: true,
      project,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error,
    });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projectRepository = getManager().getRepository(Project);
    const projects = await projectRepository.find({
      relations: ["tasks", "members"],
    });
    // If no relations are specified then nothing will be populated
    const populatedProjects = await createQueryBuilder("Project")
      .leftJoinAndSelect("Project.tasks", "Task")
      .leftJoinAndSelect("Project.members", "user")
      .getMany();
    return res.status(200).send({
      sucess: true,
      projects,
      populatedProjects,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error,
    });
  }
};
