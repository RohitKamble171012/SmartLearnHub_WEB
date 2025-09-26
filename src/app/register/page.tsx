"use client";
import { useState } from "react";
import { useThemeClasses } from "../../hooks/useThemeClasses";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "../../lib/firebaseClients";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterPage() {
  const { bgColor, textColor, buttonGreen } = useThemeClasses();
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    school: "",
    city: "",
    parentContact: "",
    standard: "",
    subject: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCred.user;
      const idToken = await user.getIdToken();

      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          fullName: form.fullName,
          email: form.email,
          role,
          school: form.school,
          city: form.city,
          parentContact: form.parentContact,
          standard: form.standard,
          subject: form.subject,
        }),
      });

      if (!res.ok) throw new Error("Registration failed");

      const data = await res.json();

      localStorage.setItem("token", idToken);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user || { uid: user.uid, email: form.email })
      );

      router.push("/");
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${bgColor} ${textColor}`}>
      {/* Spacing above the form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
            {role === "student" ? "🎓 Register as Student" : "👨‍🏫 Register as Teacher"}
          </h1>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setRole("student")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                role === "student" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole("teacher")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                role === "teacher" 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              name="school"
              placeholder="School"
              value={form.school}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />

            {role === "student" ? (
              <>
                <input
                  type="tel"
                  name="parentContact"
                  placeholder="Parent's Contact"
                  value={form.parentContact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  name="standard"
                  placeholder="Standard"
                  value={form.standard}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </>
            ) : (
              <input
                type="text"
                name="subject"
                placeholder="Subjects You Teach"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full ${buttonGreen} text-white py-3 rounded-lg transition-colors disabled:opacity-50`}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Already registered?{" "}
            <Link href="/login" className="text-blue-500 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
      
      {/* Spacing below the form (footer will be pushed down) */}
      <div className="flex-shrink-0"></div>
    </div>
  );
}
