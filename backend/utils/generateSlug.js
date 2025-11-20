export const generateSlug = (string) => {
  return string
    ?.toLowerCase() // Convert to lowercase
    ?.replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    ?.replace(/\s+/g, "-") // Replace spaces with hyphens
    ?.replace(/-+/g, "-"); // Remove multiple consecutive hyphens
};
