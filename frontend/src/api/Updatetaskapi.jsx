export const Update = async (formdata, id) => {
  const formDataToSend = new FormData();
  formDataToSend.append("title", formdata.title);
  formDataToSend.append("description", formdata.description);
  formDataToSend.append("status", formdata.status);
  formDataToSend.append("priority", formdata.priority);

  try {
    const res = await fetch(`http://localhost:8080/${id}`, {
      method: "PUT",
      body: formDataToSend,
    });

    if (res.ok) {
      return { success: true, message: res.message };
    } else {
      return {
        success: false,
        error: res.error || "An error occurred while updating",
      };
    }
  } catch (err) {
    console.error("Error updating item:", err);
    return { success: false, error: "An error occurred while updating" };
  }
};
