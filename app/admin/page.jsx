"use client";

import { useState, useEffect } from "react";
import { db, storage } from "../../lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Trash2, CheckCircle, Clock, Edit } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("inquiries"); // "inquiries" | "news"

  // Simple client-side auth for MVP
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin1234") {
      setIsAuthenticated(true);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
          <input
            type="password"
            placeholder="관리자 비밀번호 입력"
            className="w-full border p-3 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-black text-white p-3 rounded font-bold hover:bg-gray-800">
            로그인
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm text-gray-500 hover:text-black">
            로그아웃
          </button>
        </header>

        <div className="flex gap-4 mb-6">
            <button 
                onClick={() => setActiveTab("inquiries")} 
                className={`px-4 py-2 font-bold rounded ${activeTab === "inquiries" ? "bg-black text-white" : "bg-white text-gray-600 border"}`}
            >
                문의 내역
            </button>
            <button 
                onClick={() => setActiveTab("news")} 
                className={`px-4 py-2 font-bold rounded ${activeTab === "news" ? "bg-black text-white" : "bg-white text-gray-600 border"}`}
            >
                뉴스 관리
            </button>
        </div>

        {activeTab === "inquiries" ? <InquiriesTab /> : <NewsTab />}

      </div>
    </div>
  );
}

// --- INQUIRIES TAB ---
function InquiriesTab() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
        setInquiries(data);
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
        await updateDoc(doc(db, "inquiries", id), { status: newStatus });
    } catch (error) {
        console.error("Error updating status:", error);
    }
  };

  const deleteInquiry = async (id) => {
      if(!confirm("정말로 이 문의를 삭제하시겠습니까?")) return;
      try {
          await deleteDoc(doc(db, "inquiries", id));
      } catch (error) {
          console.error("Error deleting inquiry:", error);
      }
  }

  if (loading) return <div className="text-center py-20">문의 내역을 불러오는 중...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회사명</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">메시지</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
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
                                {inquiry.status?.toUpperCase() || 'NEW'}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={inquiry.message}>
                            {inquiry.message}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex gap-2 justify-end">
                                {inquiry.status === "new" && (
                                    <button onClick={() => updateStatus(inquiry.id, "contacted")} className="text-green-600 hover:text-green-900" title="Mark as Contacted">
                                        <CheckCircle className="w-5 h-5" />
                                    </button>
                                )}
                                {inquiry.status !== "closed" && (
                                    <button onClick={() => updateStatus(inquiry.id, "closed")} className="text-gray-400 hover:text-gray-600" title="Close Inquiry">
                                        <Clock className="w-5 h-5" />
                                    </button>
                                )}
                                <button onClick={() => deleteInquiry(inquiry.id)} className="text-red-400 hover:text-red-600" title="Delete">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

// --- NEWS TAB ---
function NewsTab() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
        setNews(data);
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const deleteNews = async (item) => {
      if(!confirm("정말로 이 뉴스를 삭제하시겠습니까?")) return;
      try {
          // Delete from Firestore
          await deleteDoc(doc(db, "news", item.id));
          
          // Delete image from Storage if it exists and is from our storage bucket
          if (item.image && item.image.includes("firebasestorage.googleapis.com")) {
              try {
                  const imageRef = ref(storage, item.image);
                  await deleteObject(imageRef);
              } catch (storageError) {
                  console.error("Error deleting image from storage:", storageError);
                  // We continue even if image deletion fails, as the doc is already deleted
              }
          }
      } catch (error) {
          console.error("Error deleting news:", error);
      }
  }

  const openEditModal = (newsItem) => {
      setEditingNews(newsItem);
      setIsModalOpen(true);
  };

  const openCreateModal = () => {
      setEditingNews(null);
      setIsModalOpen(true);
  };

  if (loading) return <div className="text-center py-20">뉴스를 불러오는 중...</div>;

  return (
    <>
      <div className="mb-4 flex justify-end">
          <button onClick={openCreateModal} className="bg-black text-white px-4 py-2 rounded font-bold hover:bg-gray-800">
              + 뉴스 작성
          </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                  </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {news.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex gap-2 justify-end">
                                  <button onClick={() => openEditModal(item)} className="text-blue-500 hover:text-blue-700" title="Edit">
                                      <Edit className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => deleteNews(item)} className="text-red-400 hover:text-red-600" title="Delete">
                                      <Trash2 className="w-5 h-5" />
                                  </button>
                              </div>
                          </td>
                      </tr>
                  ))}
                  {news.length === 0 && (
                      <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                              등록된 뉴스가 없습니다. 새 뉴스를 작성해주세요!
                          </td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>

      {isModalOpen && (
          <NewsModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              editingNews={editingNews} 
          />
      )}
    </>
  );
}

// --- NEWS MODAL (CREATE/EDIT) ---
function NewsModal({ isOpen, onClose, editingNews }) {
    const [formData, setFormData] = useState({
        title: editingNews?.title || "",
        category: editingNews?.category || "FN 공지",
        date: editingNews?.date || new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        image: editingNews?.image || "",
        desc: editingNews?.desc || "",
        content: editingNews?.content || ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            let finalImageUrl = formData.image;

            if (imageFile) {
                const imageRef = ref(storage, `news/${Date.now()}_${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                finalImageUrl = await getDownloadURL(imageRef);
            } else if (!editingNews && !formData.image) {
                alert("Please upload an image.");
                setSubmitting(false);
                return;
            }

            const dataToSave = { ...formData, image: finalImageUrl };

            if (editingNews) {
                await updateDoc(doc(db, "news", editingNews.id), {
                    ...dataToSave,
                    updatedAt: serverTimestamp()
                });
            } else {
                await addDoc(collection(db, "news"), {
                    ...dataToSave,
                    createdAt: serverTimestamp()
                });
            }
            onClose();
        } catch (error) {
            console.error("Error saving news:", error);
            alert("Failed to save news.");
        }
        setSubmitting(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{editingNews ? "뉴스 수정" : "뉴스 작성"}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                            <select 
                                name="category" 
                                value={formData.category} 
                                onChange={handleChange} 
                                className="w-full border p-2 rounded"
                                required
                            >
                                <option value="FN 공지">FN 공지</option>
                                <option value="추천사이트">추천사이트</option>
                                <option value="CEO 추천도서">CEO 추천도서</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">날짜 (YYYY.MM.DD)</label>
                            <input 
                                type="text" 
                                name="date" 
                                value={formData.date} 
                                onChange={handleChange} 
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이미지 업로드 (대표 이미지)</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageChange} 
                            className="w-full border p-2 rounded bg-gray-50"
                        />
                        {formData.image && !imageFile && (
                            <p className="text-xs text-gray-500 mt-2">현재 이미지 URL: {formData.image.substring(0, 50)}...</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">짧은 설명 (요약)</label>
                        <textarea 
                            name="desc" 
                            value={formData.desc} 
                            onChange={handleChange} 
                            className="w-full border p-2 rounded h-20"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">내용 (마크다운 / 텍스트)</label>
                        <textarea 
                            name="content" 
                            value={formData.content} 
                            onChange={handleChange} 
                            className="w-full border p-2 rounded h-40"
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded font-medium hover:bg-gray-50">
                            취소
                        </button>
                        <button type="submit" disabled={submitting} className="px-4 py-2 bg-black text-white rounded font-medium hover:bg-gray-800 disabled:opacity-50">
                            {submitting ? "저장 중..." : "저장"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

