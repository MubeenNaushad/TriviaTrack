// src/components/Topics.jsx
import React, { useState } from "react";
import Modal from "./Modal";

const Topics = ({ categoryId, onSelectTopic }) => {
  const [topics, setTopics] = useState([
    { id: 1, title: "Introduction to React", categoryId: "learning" },
    { id: 2, title: "Advanced JavaScript", categoryId: "learning" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");

  const handleAddTopic = () => {
    const newTopic = {
      id: topics.length + 1,
      title: newTopicTitle,
      categoryId,
    };
    setTopics([...topics, newTopic]);
    setShowModal(false);
    setNewTopicTitle("");
  };

  return (
    <div className="text-center mt-10">
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Topic
      </button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTopic();
          }}
        >
          <input
            type="text"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            placeholder="Topic Title"
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add Topic
          </button>
        </form>
      </Modal>
      <ul>
        {topics
          .filter((topic) => topic.categoryId === categoryId)
          .map((topic) => (
            <li key={topic.id} className="mb-2">
              <button
                onClick={() => onSelectTopic(topic.id, topic.title)}
                className="text-blue-500 hover:text-blue-700 font-medium text-lg py-2 px-4 rounded-lg shadow bg-white hover:bg-blue-100"
              >
                {topic.title}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Topics;
