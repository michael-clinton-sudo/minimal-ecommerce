import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { signupUser } from "../../api/authApi";
import { AppContext } from "../../context/appContext";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 15px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
`;

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signupUser({ name, email, password });

            setUser(data);

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "userInfo",
                JSON.stringify({
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    isAdmin: data.isAdmin
                })
            );

            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed");
        }
    };


    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Signup</Button>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </Form>
        </Container>
    );
};

export default Signup;
