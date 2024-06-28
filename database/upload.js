document.getElementById("uploadButton").addEventListener("click", function () {
  // Get the file input element and the selected file
  const fileUpload = document.getElementById("fileUpload");
  const file = fileUpload.files[0];

  // Require File
  if (!file) {
    alert("Please upload an Excel file.");
    return;
  }

  // FileReader to read the file content
  const reader = new FileReader();
  reader.onload = function (event) {
    const data = new Uint8Array(event.target.result);
    // Use the xlsx library to read the workbook from the array buffer
    const workbook = XLSX.read(data, { type: "array" });

    // first sheet in the workbook
    const firstSheetName = workbook.SheetNames[0];

    // Get the worksheet
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert the worksheet data to JSON format
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Send the data to the server
    sendDataToServer(jsonData);
  };

  // Read the file as an array buffer
  reader.readAsArrayBuffer(file);
});

// Function to send data to the server
function sendDataToServer(data) {
  $.ajax({
    url: "upload.php", // URL of the server-side script to handle the data
    method: "POST", // HTTP method to use for the request
    data: { data: JSON.stringify(data) }, // Data to send in the request, converted to JSON
    success: function (response) {
      // Log a success message and the server response
      console.log("Data sent to the server successfully.");
      console.log(response);

      // Display success message on the webpage
      const successMessage = document.createElement("p");
      successMessage.textContent = "Data uploaded to Database successfully!";
      document.body.appendChild(successMessage);
    },
    error: function (error) {
      // Log an error message and the error details
      console.error("Error sending data to the server.");
      console.error(error);

      // Display error message on the webpage
      const errorMessage = document.createElement("p");
      errorMessage.textContent =
        "Error uploading data to Database. Please try again.";
      document.body.appendChild(errorMessage);
    },
  });
}
