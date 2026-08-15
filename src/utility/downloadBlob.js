export const downloadBlob = (blob, prefix = "export") => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const timestamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
  const filename = `${prefix}_${timestamp}.csv`;

  const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};
