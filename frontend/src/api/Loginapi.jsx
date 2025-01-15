export const LoginUser = async (formData) => {
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    // ✅ Check for non-JSON responses (like 404 HTML errors)
    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed!");
      } else {
        throw new Error("Unexpected server response! Possible 404 error.");
      }
    }

    return await response.json();
  } catch (err) {
    console.error("Login Error:", err.message);
    throw err;
  }
};
