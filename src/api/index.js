export const fetchFragrences = async () => {
  const res = await fetch("http://localhost:8302/fragrances");
  const fragrances = await res.json();
  return fragrances;
};

export const createFragrance = async (name, description, category, image) => {
  const createdAt = new Date();
  const res = await fetch("http://localhost:8302/fragrances", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      category,
      created_at: createdAt,
      updated_at: createdAt,
      image_url: image,
    }),
  });
  const fragrance = await res.json();
  return fragrance;
};

export const updateFragrance = async (fragrance, name) => {
  const updatedAt = new Date();
  const updateBody = { ...fragrance };
  updateBody.name = name;
  updateBody.updated_at = updatedAt;

  const res = await fetch(`http://localhost:8302/fragrances/${fragrance.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateBody),
  });
  const updatedFragrance = await res.json();
  return updatedFragrance;
};

export const deleteFragrance = async (id) => {
  await fetch(`http://localhost:8302/fragrances/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
