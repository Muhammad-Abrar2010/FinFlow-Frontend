import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "./AuthContext";

export default function SwitchableForm() {
  const { login } = useAuth();
  const [signUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    pin: "",
    mobileNumber: "",
    email: "",
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.pin.length < 5 || formData.pin.length > 5) {
        console.log(formData.pin);
        toast.error("PIN must be 5 Digits");
        return;
      }
    setError("");

    try {
      if (signUp) {
        // Registration
        await axios.post("http://localhost:5000/auth/register", {
          name: formData.name,
          pin: formData.pin,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
        });
        toast.success("User registered successfully. Await admin approval.");
      } else {
        // Login
        const response = await axios.post("http://localhost:5000/auth/login", {
          identifier: formData.identifier,
          pin: formData.password,
        });
        login(response.data.user);
        console.log(response.data.user); // Save user data in context
        toast.success("Login successful");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg border bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <Toaster />
      <div
        className={`flex select-none gap-2 border-b p-2.5 *:flex-1 *:rounded-md *:border *:p-2 *:text-center *:uppercase *:shadow-inner *:outline-none dark:border-zinc-700 ${
          signUp
            ? "last-of-type:*:bg-zinc-600 last-of-type:*:text-white"
            : "first-of-type:*:bg-zinc-600 first-of-type:*:text-white"
        }`}
      >
        <button onClick={() => setSignUp(false)}>signin</button>
        <button onClick={() => setSignUp(true)}>signup</button>
      </div>

      <div className="w-full flex-col items-center overflow-hidden p-4 sm:p-8">
        {error && <p className="text-red-500">{error}</p>}

        {/* Sign up form */}
        <form
          onSubmit={handleSubmit}
          className={`${
            signUp ? "h-full duration-300" : "invisible h-0 opacity-0"
          } space-y-3 sm:space-y-5`}
        >
          <h1 className="mb-6 uppercase backdrop-blur-sm sm:text-2xl">
            Sign Up
          </h1>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md border p-2.5 outline-none dark:border-zinc-700 focus:ring-1 ring-zinc-700"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md border p-2.5 outline-none dark:border-zinc-700 focus:ring-1 ring-zinc-700"
              required
            />
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="block w-full rounded-md border p-2.5 outline-none dark:border-zinc-700 focus:ring-1 ring-zinc-700"
              required
            />
            <input
              type="password"
              name="pin"
              placeholder="5-digit PIN"
              value={formData.pin}
              onChange={handleChange}
              className="block w-full rounded-md border p-2.5 outline-none dark:border-zinc-700 focus:ring-1 ring-zinc-700"
              required
            />
          </div>
          <button
            type="submit"
            className="mx-auto block rounded-md border px-5 py-2 uppercase shadow-lg duration-200 hover:bg-zinc-400/10 dark:border-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-white"
          >
            Submit
          </button>
          <p className="text-center">
            Already have an account?
            <button
              type="button"
              onClick={() => setSignUp(!signUp)}
              className="font-semibold underline p-4"
            >
              Signin
            </button>
          </p>
        </form>

        {/* Signin form */}
        <form
          onSubmit={handleSubmit}
          className={`${
            signUp ? "h-0 opacity-0" : "h-full duration-300"
          } space-y-3 sm:space-y-5`}
        >
          <h1 className="mb-3 uppercase sm:mb-5 sm:text-2xl">Sign In</h1>
          <input
            type="text"
            name="identifier"
            placeholder="Email or Mobile Number"
            value={formData.identifier}
            onChange={handleChange}
            className="block w-full rounded-md border p-2.5 outline-none dark:border-zinc-700 focus:ring-1 ring-zinc-700"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full rounded-md border p-2.5 outline-none dark:border-zinc-700 focus:ring-1 ring-zinc-700"
            required
          />
          <p className="text-end text-sm text-zinc-600 dark:text-zinc-300">
            <a href="#" className="hover:underline">
              Forget password?
            </a>
          </p>
          <button
            type="submit"
            className="mx-auto block rounded-md border px-5 py-2 uppercase shadow-lg duration-200 hover:bg-zinc-400/10 dark:border-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-white"
          >
            Submit
          </button>
          <p className="text-center">
            Don&apos;t have an account?
            <button
              onClick={() => setSignUp(!signUp)}
              type="button"
              className="font-semibold underline p-4"
            >
              Signup
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
