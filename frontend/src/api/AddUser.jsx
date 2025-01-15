export const AddUser = async (formData) => {
  try {
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    return response.json();
  } catch (err) {
    console.log("SUser err", err);
    throw err;
  }
};
