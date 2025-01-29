import { useEffect, useState } from "react";
import axios from "axios";

export default function NoticeBoard() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/notices") // Replace with actual backend API
            .then((response) => {
                setNotices(response.data);
            })
            .catch((error) => console.error("Error fetching notices:", error));
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📌 Notice Board</h2>
            <div className="space-y-4">
                {notices.length === 0 ? (
                    <p className="text-gray-500">No notices available.</p>
                ) : (
                    notices.map((notice) => (
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
