import { useEffect, useState } from "react";
import { checkIsLogged, updateUser } from "../controller/controller";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [userLogged, setUserLogged] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    // Retrieve user information using the cookie
    async function getData() {
      const res = await checkIsLogged();
      if (res.status > 201) {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setUserLogged(res.response);
      setEmail(res.response.email);
      setName(res.response.name);
    }
    getData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target); // Get FormData object
    const data = Object.fromEntries(formData); // Convert to plain object

    console.log(data); // Log the object
    updateUser(data);
    // e.target.forEach(item => {
    //   user =
    // });
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center min-h-[70vh] h-full mt-4">
        <form
          onSubmit={handleSubmit}
          className="mx-4 flex items-center flex-col p-5 bg-sky-100 shadow-lg rounded-xl w-[90vw] border border-solid border-gray-300"
        >
          <h1 className="my-4 text-lg font-bold">Profile</h1>
          <div className="w-full">
            <label className="w-full block text-left">Email</label>
            <input
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="select-none w-full border-none bg-sky-100 p-3 mb-4 "
              type="text"
              disabled
            ></input>
          </div>
          <div className="w-full">
            <label className="w-full block text-left">Name</label>
            <input
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-sky-50 p-3 rounded-lg border border-solid border-gray-300 mb-4 focus:shadow-lg"
              type="text"
            ></input>
          </div>
          <div className="w-full">
            <label className="w-full block text-left">Password</label>
            <input
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-sky-50 p-3 rounded-lg border border-solid border-gray-300 mb-4 focus:shadow-lg"
              type="password"
            ></input>
          </div>
          <div className="w-full">
            <label className="w-full block text-left">Confirm Password</label>
            <input
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-sky-50 p-3 rounded-lg border border-solid border-gray-300 mb-4 focus:shadow-lg"
              type="password"
            ></input>
          </div>
          <div>
            <button
              type="submit"
              className={`text-sm text-white rounded-xl px-4 py-1 m-3 bg-sky-900 border-solid border-2 border-sky-900 hover:text-black hover:bg-sky-50 focus:shadow-lg`}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
