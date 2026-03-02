const mappedResult = (data = []) => {
  if (!data.length) return null;

  const totalQuiz = data.length;
  const username = data[0]?.userId?.name || "";
  const email = data[0]?.userId?.email || "";

  const passedQuiz = data.filter(obj => obj.status === 'pass').length;

  const averageScore =
    data.reduce((sum, obj) => sum + (obj.percentage || 0), 0) / totalQuiz;

  const quizzes = data.map(obj => ({
    quizId: obj.quizId?._id,
    quizTitle: obj.quizId?.title,
    score: obj.score,
    percentage: obj.percentage,
    status: obj.status,
    attemptedQuestions: obj.attemptedQuestions,
    totalQuestions: obj.totalQuestions,
    createdAt: obj.createdAt
  }));

  return {
    userId: data[0]?.userId?._id,
    username,
    email,
    totalQuiz,
    passedQuiz,
    averageScore: Number(averageScore.toFixed(2)),
    quizzes
  };
};

export default mappedResult;