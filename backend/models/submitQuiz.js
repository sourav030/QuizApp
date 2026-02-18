import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    totalQuestions: {
      type: Number,
      required: true
    },

    attemptedQuestions: {
      type: Number,
      required: true
    },

    correctAnswers: {
      type: Number,
      required: true
    },

    score: {
      type: Number,
      required: true
    },

    percentage: {
      type: Number
    },

    status: {
      type: String,
      enum: ["pass", "fail"]
    }
  },
  { timestamps: true }
);

export default mongoose.models.Result ||
  mongoose.model("Result", resultSchema);
