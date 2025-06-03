const Job = require('../model/Job');
const CustomAPIError = require('../errors/CustomAPIError');

// GET /api/v1/jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({createdBy:req.user.userId});
    return res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// GET /api/v1/jobs/:id
const getJob = async (req, res) => {
  try {
    const {user:{userId},params:{id:jobId} } = req;
    const job = await Job.findOne({_id:jobId,createdBy:userId});
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    return res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to fetch job' });
  }
};

// POST /api/v1/jobs
const createJob = async (req, res) => {
  try {
    //const job = await Job.create(req.body);
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    return res.status(201).json({ msg: 'Job created successfully', job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to create job' });
  }
};

// PATCH /api/v1/jobs/:id
const updateJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body);

    return res.status(200).json({ msg: 'Job updated successfully', job: updatedJob });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to update job' });
  }
};

// DELETE /api/v1/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    return res.status(200).json({ msg: 'Job deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to delete job' });
  }
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
};
