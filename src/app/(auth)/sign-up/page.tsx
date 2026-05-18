"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    console.log("Signing up with:", { name, email, password });
    // if (!name || !email || !password) {
    //   alert("Please fill in all fields");
    //   return;
    // }
    // await authClient.signUp.email({
    //   email,
    //   password,
    //   name,
    // });
    await authClient.signUp.email({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    });
  }

  return (
    // <button onClick={handleSignup}>
    //   Sign Up
    // </button>
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { authClient } from "@/lib/auth-client";

// export default function SignUpPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onSubmit = async () => {
//     console.log("Submitting sign up form with:", { name, email, password });
//     // return
//     const { data, error } = await authClient.signUp.email({
//       name,
//       email,
//       password,
//     }, {
//         onRequest: (ctx) => {
//             //show loading
//         },
//         onSuccess: (ctx) => {
//             //redirect to the dashboard or sign in page
//         },
//         onError: (ctx) => {
//             // display the error message
//             alert(ctx.error.message);
//         },
// });
//   };

//   return (
//     <div>
//       <input
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={onSubmit}>
//         Sign Up
//       </button>
//     </div>
//   );
// }
