"use client";

import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Trash2, CheckCircle, Clock } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simple client-side auth for MVP
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin1234") {
      setIsAuthenticated(true);
      fetchInquiries();
    } else {
      alert("Invalid Password");
    }
  };

  const fetchInquiries = () => {
    try {
        const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Handle potential null createdAt for very new docs
                createdAt: doc.data().createdAt?.toDate() || new Date()
            }));
            setInquiries(data);
            setLoading(false);
        });
        return () => unsubscribe();
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        setLoading(false);
    }
  };

  // Status Colors
  const getStatusColor = (status) => {
    switch(status) {
        case "new": return "bg-blue-100 text-blue-800";
        case "contacted": return "bg-green-100 text-green-800";
        case "closed": return "bg-gray-100 text-gray-800";
        default: return "bg-gray-100 text-gray-800";
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
        await updateDoc(doc(db, "inquiries", id), {
            status: newStatus
        });
    } catch (error) {
        console.error("Error updating status:", error);
    }
  };

  const deleteInquiry = async (id) => {
      if(!confirm("Are you sure you want to delete this inquiry?")) return;
      try {
          await deleteDoc(doc(db, "inquiries", id));
      } catch (error) {
          console.error("Error deleting inquiry:", error);
      }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter Admin Password"
            className="w-full border p-3 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-black text-white p-3 rounded font-bold hover:bg-gray-800">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inquiry Dashboard</h1>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm text-gray-500 hover:text-black">
            Logout
          </button>
        </header>

        {loading ? (
            <div className="text-center py-20">Loading...</div>
        ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {inquiries.map((inquiry) => (
                            <tr key={inquiry.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {inquiry.createdAt.toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{inquiry.firstName} {inquiry.lastName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{inquiry.email}</div>
                                    <div className="text-sm text-gray-500">{inquiry.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {inquiry.company}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
                                        {inquiry.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={inquiry.message}>
                                    {inquiry.message}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex gap-2 justify-end">
                                        {inquiry.status === "new" && (
                                            <button 
                                                onClick={() => updateStatus(inquiry.id, "contacted")}
                                                className="text-green-600 hover:text-green-900"
                                                title="Mark as Contacted"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                            </button>
                                        )}
                                        {inquiry.status !== "closed" && (
                                            <button 
                                                onClick={() => updateStatus(inquiry.id, "closed")}
                                                className="text-gray-400 hover:text-gray-600"
                                                title="Close Inquiry"
                                            >
                                                <Clock className="w-5 h-5" />
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => deleteInquiry(inquiry.id)}
                                            className="text-red-400 hover:text-red-600"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
}
