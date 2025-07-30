export const handleMutation = async ({
  mutationFn,
  payload,
  onSuccess = () => {},
  onError = () => {},
}) => {
  try {
    const result = await mutationFn(payload).unwrap();
    onSuccess(result);

    console.log("Mutation successful:", result);
  } catch (error) {
    onError(error);
    console.log("Mutation failed:", error);
  }
};
