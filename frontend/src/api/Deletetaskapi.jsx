export const deleteTask = async (item) => {
  const conf = confirm("Are you sure you wanna delete this?");
  if (!conf) return;

  try {
    const response = await fetch(`http://localhost:8080/${item}`, {
      method: "DELETE",
    });

    // Assuming the response is in JSON format
    const res = await response.json();
    console.log(res);

    if (response.ok) {
      return { success: true, message: res.message };
    } else {
      return {
        success: false,
        error: res.error || "An error occurred while deleting",
      };
    }
  } catch (err) {
    console.error("Error deleting item:", err);
    return { success: false, error: "An error occurred while deleting" };
  }
};
