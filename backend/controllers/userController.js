import mongoose from 'mongoose';
import Quiz from '../models/uqizModel.js';
import Question from '../models/quesModel.js'
import Submission from '../models/submissionModel.js';
import Result from '../models/submitQuiz.js';

export async function getAllQuiz(req, res) {
    try {

        const allQuiz=await Quiz.find();
        return res.status(200).json({
            success:true,
            message:"This is All Quize",
            allQuiz
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Server Side Error"
        })
    }
}

export async function getQuestion(req,res){
    try{
        const { quizId } = req.params;
        const allQuestion= await Question.find({quizId});
        return res.status(200).json({
            success:true,
            message:"Successfull",
            allQuestion
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Server side error"
        })
    }
}


export async function submitAns(req, res) {
  try {
    const { quizId, quesId, submitAns } = req.body;

    // 1️⃣ Check quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found"
      });
    }

    // 2️⃣ Check question
    const question = await Question.findById(quesId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    // 3️⃣ Verify question belongs to quiz
    if (question.quizId.toString() !== quizId) {
      return res.status(400).json({
        success: false,
        message: "Question does not belong to this quiz"
      });
    }

    // 4️⃣ Prevent duplicate submission
    const alreadySubmitted = await Submission.findOne({
      quizId,
      quesId,
      answerBy: req.user._id
    });

    if (alreadySubmitted) {
      return res.status(400).json({
        success: false,
        message: "You already submitted this question"
      });
    }

    // 5️⃣ Calculate marks
    const marks =
      question.correctAnswer.trim().toLowerCase() ===
      submitAns.trim().toLowerCase()
        ? 1
        : 0;

    // 6️⃣ Save submission
    const submission = await Submission.create({
      quizId,
      quesId,
      submitAns,
      marks,
      answerBy: req.user._id
    });

    // 7️⃣ Response
    return res.status(200).json({
      success: true,
      message: "Answer submitted successfully",
      data: {
        submittedAnswer: submitAns,
        correctAnswer: question.correctAnswer,
        marks
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.body;
    const userId = req.user._id;

    const submissions = await Submission.find({
      quizId,
      answerBy: userId
    });

    if (submissions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No answers submitted"
      });
    }

    const totalQuestions = submissions.length;
    const correctAnswers = submissions.filter(s => s.marks === 1).length;

    const score = correctAnswers;
    const percentage = (correctAnswers / totalQuestions) * 100;

    const status = percentage >= 40 ? "pass" : "fail";

    await Result.create({
      quizId,
      userId,
      totalQuestions,
      attemptedQuestions: totalQuestions,
      correctAnswers,
      score,
      percentage,
      status
    });

    return res.status(200).json({
      success: true,
      message: "Quiz submitted successfully",
      score,
      percentage,
      status
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getQuizResult = async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user._id;

    // check quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found"
      });
    }

    // aggregation
    const result = await Submission.aggregate([
      {
        $match: {
          quizId: quiz._id,
          answerBy: userId
        }
      },
      {
        $group: {
          _id: "$quizId",
          totalScore: { $sum: "$marks" },
          totalQuestionsAttempted: { $sum: 1 }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No attempts yet",
        totalScore: 0,
        totalQuestionsAttempted: 0
      });
    }

    return res.status(200).json({
      success: true,
      quizId,
      totalScore: result[0].totalScore,
      totalQuestionsAttempted: result[0].totalQuestionsAttempted
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
