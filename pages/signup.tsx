
import { Inter } from 'next/font/google'
import Image from 'next/image';
import link from '../public/link.png'
import { useState } from "react";


const SignupPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmPass] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
    };

    return (
        <div className="flex h-screen items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
            <div className="text-center">
              <Image
                src={link}
                alt="LinkedIn"
                width={100}
                height={100}
                className="mx-auto"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">SignUp to your account</h2>
            </div>
    
            <form className="mt-6 space-y-6" action="#" method="POST">
              {/* Your form inputs here */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-md border border-gray-300 py-2 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
                  />
                </div>
              </div>
    
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-md border border-gray-300 py-2 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmpass" className="block text-sm font-medium text-gray-900">Confirm Password</label>
                <div className="mt-1">
                  <input
                    id="confirmpass"
                    name="confirmpass"
                    type="confirmpass"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-md border border-gray-300 py-2 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
                  />
                </div>
              </div>
    
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 text-sm font-semibold hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:outline-none"
                >
                  Sign Up
                </button>
              </div>
            </form>
    
            <p className="mt-6 text-center text-sm text-gray-500">
              Already a member?
              <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">SignIn</a>
            </p>
          </div>
        </div>
      );
};

export default SignupPage;
