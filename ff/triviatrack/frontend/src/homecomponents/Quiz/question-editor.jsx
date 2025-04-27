"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trash2,
  PlusCircle,
  GripVertical,
  CheckCircle,
  Circle,
} from "lucide-react";
import { useParams } from "react-router-dom";

export default function QuestionEditor({
  question,
  questionNumber,
  onUpdate,
  onRemove,
}) {
  const handleQuestionTextChange = (e) => {
    onUpdate({
      ...question,
      text: e.target.value,
    });
  };

  const handleTypeChange = (value) => {
    let updatedOptions = [...question.options];


    if (value === "true-false") {
      updatedOptions = [
        { id: `opt-${Date.now()}-1`, text: "True", isCorrect: false },
        { id: `opt-${Date.now()}-2`, text: "False", isCorrect: false },
      ];
    } else if (question.type === "true-false") {
      updatedOptions = [
        { id: `opt-${Date.now()}-1`, text: "", isCorrect: false },
        { id: `opt-${Date.now()}-2`, text: "", isCorrect: false },
      ];
    }

    onUpdate({
      ...question,
      type: value,
      options: updatedOptions,
    });
  };

  const addOption = () => {
    if (question.type === "true-false") return;

    onUpdate({
      ...question,
      options: [
        ...question.options,
        { id: `opt-${Date.now()}`, text: "", isCorrect: false },
      ],
    });
  };

  const updateOption = (optionId, field, value) => {
    let updatedOptions;

    if (field === "isCorrect" && value === true) {
      updatedOptions = question.options.map((opt) =>
        opt.id === optionId
          ? { ...opt, isCorrect: true }
          : { ...opt, isCorrect: false }
      );
    } else {
      updatedOptions = question.options.map((opt) =>
        opt.id === optionId ? { ...opt, [field]: value } : opt
      );
    }

    onUpdate({
      ...question,
      options: updatedOptions,
    });
  };

  const removeOption = (optionId) => {
    onUpdate({
      ...question,
      options: question.options.filter((opt) => opt.id !== optionId),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-3 px-6 bg-gray-50 border-b">
        <div className="flex items-center">
          <GripVertical className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="font-medium">Question {questionNumber}</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(question.id)}
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete question</span>
        </Button>
      </CardHeader>

      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <label
              htmlFor={`question-${question.id}`}
              className="block text-sm font-medium mb-1"
            >
              Question Text
            </label>
            <Input
              id={`question-${question.id}`}
              value={question.text}
              onChange={handleQuestionTextChange}
              placeholder="Enter your question"
              className="w-full"
            />
          </div>

          <div>
            <label
              htmlFor={`question-type-${question.id}`}
              className="block text-sm font-medium mb-1"
            >
              Question Type
            </label>
            <Select value={question.type} onValueChange={handleTypeChange}>
              <SelectTrigger id={`question-type-${question.id}`}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="true-false">True/False</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium">Answer Options</label>
            {question.type === "multiple-choice" && (
              <Button
                variant="outline"
                size="sm"
                onClick={addOption}
                className="h-8"
                disabled={question.options.length >= 6}
              >
                <PlusCircle className="mr-1 h-3 w-3" />
                Add Option
              </Button>
            )}
          </div>

          <div className="space-y-2 mt-2">
            {question.options.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 border rounded-md p-2"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-8 p-0 ${option.isCorrect
                    ? "text-green-600"
                    : "text-gray-400 hover:text-gray-600"
                    }`}
                  onClick={() => updateOption(option.id, "isCorrect", true)}
                >
                  {option.isCorrect ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                  <span className="sr-only">Mark as correct</span>
                </Button>

                <Input
                  value={option.text}
                  onChange={(e) =>
                    updateOption(option.id, "text", e.target.value)
                  }
                  placeholder="Enter answer option"
                  className="flex-1"
                  disabled={question.type === "true-false"}
                />

                {question.type === "multiple-choice" &&
                  question.options.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(option.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete option</span>
                    </Button>
                  )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
