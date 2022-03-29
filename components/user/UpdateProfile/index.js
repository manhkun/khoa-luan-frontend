import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import AuthContext from "../../../context/AuthContext";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { loading, error, user, clearErrors } = useContext(AuthContext);
  

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
    if (error) {
      toast.error(error)
    }
  }, [loading, error, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // register({ firstName, lastName, email, password });
  }

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/profile.svg" alt="profile" layout="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> Profile</h2>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-user-tie"></i>
                  <input
                    type="text"
                    placeholder="Enter Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="\S+@\S+\.\S+"
                    title="Your email is invalid"
                    required
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                </div>
              </div>
              <div className="registerButtonWrapper">
                <button type="submit" className="registerButton">
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
