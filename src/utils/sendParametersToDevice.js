export const sendParametersToDevice = () => {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.2;

    setTimeout(() => {
      if (success) {
        resolve("Parameters sent successfully!");
      } else {
        reject("Failed to send parameters.");
      }
    }, 2000);
  });
};
