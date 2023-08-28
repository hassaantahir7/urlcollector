const urlInput = document.getElementById('urlInput');
const addButton = document.getElementById('addButton');
const linksTableBody = document.getElementById('linksTableBody');
const clickedLinksTableBody = document.getElementById('clickedLinksTableBody');
const resetButton = document.getElementById('resetButton');

async function fetchAndDisplayUrls() {
    const response = await fetch('/.netlify/functions/fetchURLs');
    const data = await response.json();
  
    linksTableBody.innerHTML = '';
  
    data.forEach((url, index) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${index + 1}</td>
        <td><a href="${url}" target="_blank">${url}</a></td>
        <td class="status">Not Used</td>
        <td><button class="deleteButton">Delete</button></td>
      `;
      linksTableBody.appendChild(newRow);
    });
  }
  
  addButton.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    if (url !== '') {
      const response = await fetch('/.netlify/functions/storeURL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
  
      if (response.ok) {
        urlInput.value = '';
        await fetchAndDisplayUrls();
      }
    }
  });
  
  // Fetch and display URLs when the page loads
  fetchAndDisplayUrls();
   

linksTableBody.addEventListener('click', (event) => {
  if (event.target.classList.contains('deleteButton')) {
    event.target.closest('tr').remove();
  } else if (event.target.tagName === 'A') {
    const statusCell = event.target.parentNode.nextElementSibling;
    statusCell.textContent = 'Used';
    statusCell.classList.add('used');

    const clickedUrlRow = document.createElement('tr');
    clickedUrlRow.innerHTML = `
      <td>${event.target.href}</td>
      <td><button class="deleteButton">Delete</button></td>
    `;
    clickedLinksTableBody.appendChild(clickedUrlRow);

    event.target.closest('tr').remove();
  }
});

clickedLinksTableBody.addEventListener('click', (event) => {
  if (event.target.classList.contains('deleteButton')) {
    event.target.closest('tr').remove();
  }
});

// resetButton.addEventListener('click', () => {
//   linksTableBody.innerHTML = '';
//   clickedLinksTableBody.innerHTML = '';
//   linkIdCounter = 1;
// });
