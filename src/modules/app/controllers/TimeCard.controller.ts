import { RequestHandler, Request, Response } from "express";
import { createQueryBuilder, getManager } from "typeorm";
import { Project } from "../../../entity/Project";
import { Task } from "../../../entity/Task";
import { TimeCard } from "../../../entity/TimeCard";
import { User } from "../../../entity/User";
import { BillingType } from "../../../interfaces/BillingType";

export const createTimeCard: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      billingType,
      date,
      logTime,
      notes,
      projectId,
      taskId,
      title,
      userId,
    } = req.body;
    if (!date || !logTime || !title || !projectId || !userId) {
      return res.status(400).send({
        success: false,
        error: "Please provide required fields",
      });
    }
    const userRepository = getManager().getRepository(User);
    const projectRepository = getManager().getRepository(Project);
    const taskRepository = getManager().getRepository(Task);
    const timeCardRepository = getManager().getRepository(TimeCard);
    const projectExists = await projectRepository.findOne(projectId);
    if (!projectExists) {
      return res.status(400).send({
        success: false,
        error: "Please provide a valid project",
      });
    }

    if (taskId) {
      const taskExists = await taskRepository.findOne(taskId);
      if (!taskExists) {
        return res.status(400).send({
          success: false,
          error: "Please provide a valid task",
        });
      }
    }

    const userExists = await userRepository.findOne(userId);
    if (!userExists) {
      return res.status(400).send({
        success: false,
        error: "Please provide valid owner of project",
      });
    }

    // 3:30 3.5 3.75 1.25
    // Logtime conversion
    if (
      typeof logTime !== "string" ||
      (!logTime.includes(":") && !logTime.includes("."))
    ) {
      return res.status(400).send({
        success: false,
        error: "Please provide a valid logTime",
      });
    }

    // Time will be stored in hours
    let timeArr;
    enum TimeFormat {
      HOURMIN = "HOURMIN",
      HOURS = "HOURS",
    }
    let timeFormat: TimeFormat;
    if (logTime.includes(":")) {
      timeArr = logTime.split(":");
      timeFormat = TimeFormat.HOURMIN;
    } else {
      timeArr = logTime.split(".");
      timeFormat = TimeFormat.HOURS;
    }

    let logTimeInMinutes;
    if (timeFormat === TimeFormat.HOURMIN) {
      logTimeInMinutes = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
    } else {
      logTimeInMinutes =
        parseInt(timeArr[0]) * 60 +
        (parseInt(timeArr[1]) * 60) / Math.pow(10, timeArr[1].length);
    }
    let data = {};

    data = {
      date,
      logTime: logTimeInMinutes,
      projectId,
      title,
      userId,
    };
    if (taskId || billingType || notes) {
      if (taskId) {
        data = {
          ...data,
          taskId,
        };
      }
      if (billingType) {
        data = {
          ...data,
          billingType,
        };
      }
      if (notes && notes.length) {
        data = {
          ...data,
          notes,
        };
      }
    }

    const timeCard = timeCardRepository.create({
      ...data,
    });

    await timeCardRepository.save(timeCard);
    return res.status(200).send({
      success: true,
      timeCard,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error,
    });
  }
};

export const getTimeCard: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const timeCardRepository = getManager().getRepository(TimeCard);
    const timeCards = await timeCardRepository.find();
    // Change required
    const populatedTimeCards = await createQueryBuilder("TimeCard")
      .leftJoinAndSelect("TimeCard.project", "Project")
      .getMany();
    return res.status(200).send({
      sucess: true,
      timeCards,
      populatedTimeCards,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error,
    });
  }
};
