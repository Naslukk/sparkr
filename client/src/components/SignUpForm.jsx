import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Input } from "antd";

import "./style.css";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prof, setProf] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);
  const [genderPreference, setGenderPreference] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

  const fileInputRef = useRef(null);

  const { signup, verifyotp, loading, error } = useAuthStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const onChange = (text) => {
    setOtp(text);
  };
  const sharedProps = {
    onChange,
  };

  return (
    <div>
      {step !== 2 || loading === true || error === true? (
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            signup({
              name, email, password, prof, gender, age, genderPreference ,image 
            });
            setStep(2);
          }}
        >
          {/* NAME */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
          </div>

          {/* PROFESSION */}
          <div>
            <label
              htmlFor="prof"
              className="block text-sm font-medium text-gray-700"
            >
              What's your profession
            </label>
            <div className="mt-1">
              <input
                id="prof"
                name="prof"
                type="text"
                required
                autoComplete="new-password"
                value={prof}
                onChange={(e) => setProf(e.target.value)}
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
          </div>

          {/* AGE */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <div className="mt-1">
              <input
                id="age"
                name="age"
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="18"
                max="120"
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
          </div>

          {/* GENDER */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Gender
            </label>
            <div className="flex gap-2 mt-2">
              <div className="flex items-center">
                <input
                  id="male"
                  name="gender"
                  type="checkbox"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label
                  htmlFor="male"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female"
                  name="gender"
                  type="checkbox"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label
                  htmlFor="female"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Female
                </label>
              </div>
            </div>
          </div>

          {/* GENDER PREFERENCE */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prefer Me
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  id="prefer-male"
                  name="gender-preference"
                  type="radio"
                  value="male"
                  checked={genderPreference === "male"}
                  onChange={(e) => setGenderPreference(e.target.value)}
                  className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                />
                <label
                  htmlFor="prefer-male"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="prefer-female"
                  name="gender-preference"
                  type="radio"
                  value="female"
                  checked={genderPreference === "female"}
                  onChange={(e) => setGenderPreference(e.target.value)}
                  className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                />
                <label
                  htmlFor="prefer-female"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="prefer-both"
                  name="gender-preference"
                  type="radio"
                  value="both"
                  checked={genderPreference === "both"}
                  onChange={(e) => setGenderPreference(e.target.value)}
                  className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                />
                <label
                  htmlFor="prefer-both"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Both
                </label>
              </div>
            </div>
          </div>

          {/* ID Card Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Office id card
            </label>
            <div className="flex items-center mt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Upload Image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                required
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="User Image"
                className="object-cover w-48 h-full rounded-md"
              />
            </div>
          )}

          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading
                  ? "bg-pink-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              }`}
              disabled={loading}
            >
              {loading ? "Sending otp..." : "Send Otp"}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-center">
          <form className="text-center"
           onSubmit={(e) => {
            e.preventDefault();
            verifyotp({
              name, email, password, prof, gender, age, genderPreference , image ,otp
            });
          }}
          >
            <h2 className="mb-4 text-2xl font-semibold">Verify OTP</h2>
            <p className="mb-6 text-gray-600">
              Enter the 6-digit code sent to your email
            </p>
            <Input.OTP
              formatter={(str) => str.toUpperCase()}
              {...sharedProps}
              size="large"
              rootClassName="custom-otp"
            />
            <button className="flex px-4 py-2 mt-3 text-sm font-medium border border-pink-500 rounded-md shadow-sm justify-self-end"
            onClick={() => {
              setStep(1);
            }}
            >
              Go back
            </button>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white mt-8 ${
                loading
                  ? "bg-pink-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              }`}
              disabled={loading}
            >
              {loading ? "Verifying ..." : "Verify"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default SignUpForm;
