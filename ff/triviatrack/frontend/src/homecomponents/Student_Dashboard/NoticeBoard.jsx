import { useEffect, useState } from "react";
import axios from "axios";

export default function NoticeBoard() {
    const [notices, setNotices] = useState([]);

    const notice = [{
        _id: "1",
        title: "Notice 1",
        description: "This is the first notice.",
        urgent: true,
        createdAt: Date.now(),
    },
    {
        _id: "2",
        title: "Notice 2",
        description: "This is the second notice.",
        urgent: false,
        createdAt: Date.now(),
    },
    {
        _id: "3",
        title: "Notice 3",
        description: "This is the third notice.",
        urgent: false,
        createdAt: Date.now(),
    }]

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📌 Notice Board</h2>
            <div className="space-y-4">
                {notice.length === 0 ? (
                    <p className="text-gray-500">No notices available.</p>
                ) : (
                    notice.map((notice) => (
                        <div key={notice._id}
                            className={`p-4 rounded-lg border-l-4 shadow-sm 
                            ${notice.urgent ? "bg-red-100 border-red-500" : "bg-gray-100 border-blue-500"}`}>
                            <h3 className="text-lg font-semibold">{notice.title}</h3>
                            <p className="text-gray-700">{notice.description}</p>
                            <span className="text-xs text-gray-500">Posted on: {new Date(notice.createdAt).toLocaleDateString()}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
