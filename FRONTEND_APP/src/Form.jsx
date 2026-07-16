import { useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [displayPassword, setDisplayPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setDisplayName(name);
    setDisplayEmail(email);
    setDisplayPassword(password);
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setPassword("");
    setDisplayName("");
    setDisplayEmail("");
    setDisplayPassword("");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-3xl shadow-xl">


      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700"> Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Enter your email"/>
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700"> Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"  placeholder="Enter your password" />
        </div>

        <div className="flex gap-3">
          <button type="submit"  className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 transition"> Submit</button>
          <button type="button" onClick={handleClear}  className="flex-1 rounded-2xl bg-gray-200 px-4 py-3 text-gray-800 font-semibold hover:bg-gray-300 transition">Clear</button>
        </div>
      </form>

      <div className="mt-8 rounded-3xl bg-gray-50 p-5 border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Entered Details</h3>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Name:</span> {displayName || "-"}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Email:</span> {displayEmail || "-"}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Password:</span> {displayPassword || "-"}
        </p>
      </div>
    </div>
  );
}

export default Form;