const form = document.getElementById("login-form");
const messageEl = document.getElementById("message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const user = {
    email: event.target.email.value,
    password: event.target.password.value,
  };
  console.log(user);
  fetchLogin(user);
});

async function fetchLogin(user) {
  const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });


 if (!res.ok) {
    const err = await res.json();
    const { message } = err;
    messageEl.textContent = message;
    messageEl.style.color = "red";
  } else {
    const tokenObj = await res.json();
    console.log(tokenObj);
    localStorage.setItem("accessToken", access_token);
    window.location.href = "/profile"
  }
}
