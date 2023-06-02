import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { firebaseConfig } from "../../utils/FirebaseConfig";
import { Github, Google } from "../../assets/icons";
import api from "../../apis";
import { IUser } from "../../interfaces";
import { toast } from "react-hot-toast";

function Login() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const { setUpStorage } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const signInWithGoogle = useMutation(
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = (await signInWithPopup(auth, googleProvider)).user;
      localStorage.setItem("access_token", user.stsTokenManager.accessToken);
      localStorage.setItem("refresh_token", user.stsTokenManager.refreshToken);

      return api.auth.login();
    },
    {
      onSuccess: async ({ data }: { data: IUser }) => {
        setUpStorage({
          user: data,
        });

        if (data.organizations && data.organizations.length > 0) {
          navigate("/");
        } else {
          navigate("/onboard");
        }
      },
      onError: (error: {
        message: string;
        response: {
          data: {
            message: string;
          };
        };
      }) => {
        toast.error(error.response?.data?.message || error.message);
      },
    }
  );

  const signInWithGithub = useMutation(
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = (await signInWithPopup(auth, githubProvider)).user;
      localStorage.setItem("access_token", user.stsTokenManager.accessToken);
      localStorage.setItem("refresh_token", user.stsTokenManager.refreshToken);

      return api.auth.login();
    },
    {
      onSuccess: async ({ data }: { data: IUser }) => {
        setUpStorage({
          user: data,
        });
        if (data.organizations && data.organizations.length > 0) {
          navigate("/");
        } else {
          navigate("/onboard");
        }
      },
      onError: (error: {
        message: string;
        response: {
          data: {
            message: string;
          };
        };
      }) => {
        toast.error(error.response?.data?.message || error.message);
      },
    }
  );

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex">
      <div
        className="w-1/2 h-screen"
        style={{
          background: "linear-gradient(121.68deg, #76AAF9 2.46%, #394DFD 100%)",
        }}
      >
        <div
          className="flex justify-end ml-[60px] mt-[100px] w-full rounded-s-lg"
          style={{
            height: "calc(100vh - 100px)",
            width: "calc(50vw - 60px)",
            background:
              "linear-gradient(96.58deg, rgba(239, 239, 239, 0.6) 0%, rgba(239, 239, 239, 0.1) 105.5%)",
            backdropFilter: "blur(25px)",
          }}
        >
          <p className=" text-gray-900 text-4xl font-semibold leading-[52px] w-4/5 mt-28 ml-32">
            Revolutionize your billing experience with dStream: Seamlessly
            manage metered billing and unlock new possibilities for your
            business.
          </p>
        </div>
      </div>
      <div className="w-1/2 flex justify-end flex-col">
        <div
          className="bg-white mt-20 mb-0 rounded-xl"
          style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
            height: "calc(100vh - 10rem)",
          }}
        >
          <div className="mx-20 mt-32">
            <p className="text-4xl font-bold text-gray-900 mb-3">
              Get started with dStream
            </p>
            <div className="flex items-center">
              <p className="text-base text-gray-700 mb-3">
                Few steps away from unlocking dStream power
              </p>
              {/* <Link to="/signup">
                <p className="text-base font-semibold text-blue-600 mb-3 ml-1">
                  Sign up for free
                </p>
              </Link> */}
            </div>
            <button
              className="px-24 rounded-md text-gray-900 mt-24 flex items-center mx-auto py-3 justify-center"
              style={{
                boxShadow:
                  "0px 0px 1px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.08)",
              }}
              onClick={() => signInWithGoogle.mutate()}
            >
              <Google />
              <span className="ml-2">Log in with Google</span>
            </button>
            <div className="mt-8 flex items-center justify-center">
              <div className="h-px w-20 bg-bw-200 mr-2" />
              <p className="text-base font-semibold text-gray-900 mr-2">OR</p>
              <div className="h-px w-20 bg-bw-200" />
            </div>
            <button
              className="px-24 rounded-md text-gray-900 mt-8 flex items-center mx-auto py-3 justify-center"
              style={{
                boxShadow:
                  "0px 0px 1px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.08)",
              }}
              onClick={() => signInWithGithub.mutate()}
            >
              <Github />
              <span className="ml-2">Log in with Github</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
