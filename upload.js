document.addEventListener("DOMContentLoaded", function () {
      // Fetch the file using getFile.php endpoint
      fetch('getFile.php')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.arrayBuffer();
        })
        .then(data => {
          const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          sendDataToServer(jsonData);
        })
        .catch(error => {
          console.error('Error fetching the Excel file:', error);
          const errorMessage = document.createElement("p");
          errorMessage.textContent = "Error fetching the Excel file. Please try again.";
          document.body.appendChild(errorMessage);
        });
    });

    function sendDataToServer(data) {
      $.ajax({
        url: "upload.php",
        method: "POST",
        data: { data: JSON.stringify(data) },
        success: function (response) {
          console.log("Data sent to the server successfully.");
          console.log(response);
          const successMessage = document.createElement("p");
          successMessage.textContent = "Data uploaded to Database successfully!";
          document.body.appendChild(successMessage);
        },
        error: function (error) {
          console.error("Error sending data to the server.");
          console.error(error);
          const errorMessage = document.createElement("p");
          errorMessage.textContent = "Error uploading data to Database. Please try again.";
          document.body.appendChild(errorMessage);
        },
      });
    }