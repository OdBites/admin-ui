export const useGetDataById = ({ data, targetField = "id", id }) => {
  if (!data || id === undefined || id === null) {
    return null;
  }

  const result = data.find((item) => String(item[targetField]) === String(id));

  return result || null;
};
