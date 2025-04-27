import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Save } from "lucide-react";
import QuestionEditor from "./question-editor";
import QuizPreview from "./quiz-preview";
import Sidebars from "../Dashboard/Sidebar.jsx";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_APP_BASEURL;

export default function QuizBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState("edit");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  axios.defaults.withCredentials = true;


  useEffect(() => {
    if (!id) return;
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/api/quizzes/${id}`);
        setQuizTitle(data.title || "");
        setQuizDescription(data.description || "");
        setQuestions(data.questions || []);
        setSelectedCourseId(data.courseId || "");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load quiz data.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/course/getcourse`);
        setCourses(data);
      } catch (err) {
        console.error(err);
        toast.error("Couldn’t load courses");
      }
    };
    fetchCourses();
  }, []);

  const addQuestion = () => {
    const ts = Date.now();
    setQuestions((prev) => [
      ...prev,
      {
        id: `q-${ts}`,
        text: "",
        type: "multiple-choice",
        options: [
          { id: `opt-${ts}-1`, text: "", isCorrect: false },
          { id: `opt-${ts}-2`, text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const updateQuestion = (updated) => {
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
  };

  const removeQuestion = (qid) => {
    setQuestions((prev) => prev.filter((q) => q.id !== qid));
  };

  const handleSave = async () => {
    setLoading(true);
    const quizData = {
      courseId: selectedCourseId,
      title: quizTitle,
      description: quizDescription,
      questions: questions.map((q) => ({
        text: q.text,
        type: q.type,
        options: q.options.map((opt) => ({
          text: opt.text,
          isCorrect: opt.isCorrect,
        })),
      })),
    };

    try {
      if (id) {
        await axios.put(`${API_BASE_URL}/api/quizzes/${id}`, quizData);
        toast.success("Quiz updated successfully!");
      } else {
        const { data } = await axios.post(`${API_BASE_URL}/api/quizzes`, quizData);
        toast.success("Quiz created successfully!");
        navigate(`/generate-quiz/${data._id}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Progress value={33} />;

  return (
    <div className="flex pt-6 mt-6">
      <Sidebars />

      <div className="flex-1 max-w-5xl mx-auto mt-28 px-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Trivia Track Quiz</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="edit">Edit Quiz</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit">

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1" htmlFor="course-select">
                Select Course
              </label>
              <select
                id="course-select"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="" disabled>Choose a course</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>{c.courseTitle}</option>
                ))}
              </select>
            </div>


            <Card className="mb-6 shadow-md rounded-xl border border-gray-200">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Quiz Title</label>
                  <Input
                    placeholder="Enter quiz title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    placeholder="Enter quiz description"
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Questions */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Questions</h2>
                <Button onClick={addQuestion} variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                </Button>
              </div>

              {questions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg text-gray-500">
                  <PlusCircle className="h-6 w-6 mb-2" />
                  <p>No questions yet. Click "Add Question" to get started.</p>
                </div>
              ) : (
                questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <QuestionEditor
                      question={question}
                      questionNumber={index + 1}
                      onUpdate={updateQuestion}
                      onRemove={removeQuestion}
                    />
                  </motion.div>
                ))
              )}

              {questions.length > 0 && (
                <div className="sticky bottom-6 bg-white py-4 border-t flex justify-end">
                  <Button onClick={handleSave} className="px-6 bg-green-600 hover:bg-green-700 text-white">
                    <Save className="mr-2 h-4 w-4" /> Save Quiz
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <QuizPreview title={quizTitle} description={quizDescription} questions={questions} />
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setActiveTab("edit")} className="px-6">
                Back to Editor
              </Button>
              <Button onClick={handleSave} className="px-6">
                <Save className="mr-2 h-4 w-4" /> Save Quiz
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
