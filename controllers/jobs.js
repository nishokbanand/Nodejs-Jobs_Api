const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Job = require("../models/Job");
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  if (!jobs) {
    throw new BadRequestError("no jobs available");
  }
  res.status(StatusCodes.OK).json({ jobs: jobs, length: jobs.length });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findById({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new BadRequestError(`No job with id ${jobId} available`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(job);
};
const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position },
  } = req;
  if (company == "" || position == "") {
    throw new BadRequestError("company and position cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    { company, position },
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new BadRequestError(`No job with id ${jobId} available`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new BadRequestError(`No job with id ${jobId} available`);
  }
  res.status(StatusCodes.OK).send();
};
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
