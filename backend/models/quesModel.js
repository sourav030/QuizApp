import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true
    },

    options: {
      type: [String], 
      required: true,
      validate: {
        validator: function (v) {
          return v.length === 4;
        },
        message: "Options must be exactly 4"
      }
    },

    correctAnswer: {
      type: String,
      required: true
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true
    }
    
  },
  { timestamps: true }
);

export default mongoose.model.Question ||
  mongoose.model("Question", questionSchema);

