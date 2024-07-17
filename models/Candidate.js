const mongoose = require("mongoose");

const CandidateSchmea = mongoose.Schema({
  name: {
    type: String,
    required: ture,
  },
  party: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      votedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  voteCount: {
    type: Number,
    default: 0,
  },
});

const candidate = mongoose.model("candidate", CandidateSchmea);

module.exports = candidate;
