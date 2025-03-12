import React from "react";

function Login() {
  return (
    <div>
      <div class="relative flex flex-col justify-center h-screen overflow-hidden">
        <div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-yellow-400 lg:max-w-lg">
          <h1 class="text-3xl font-semibold text-center text-gray-700">
            Log In
          </h1>
          <form class="space-y-4">
            <div>
              <label class="label">
                <span class="text-base label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email Address"
                class="w-full input input-bordered"
              />
            </div>
            <div>
              <label class="label">
                <span class="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                class="w-full input input-bordered"
              />
            </div>
            <a
              href="#"
              class="text-xs text-gray-600 hover:underline hover:text-blue-600"
            >
              Forget Password?
            </a>
            <div>
              <button class="btn-neutral btn btn-block">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
