export const Addtasks = async (formdata) => {
  try {
    const response = await fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify(formdata), // Send the data as JSON
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }
    return response.json(); // Parse the JSON response from the server
  } catch (err) {
    console.log("Form submit error:", err);
    throw err; // Rethrow the error to be handled in the component
  }
};
