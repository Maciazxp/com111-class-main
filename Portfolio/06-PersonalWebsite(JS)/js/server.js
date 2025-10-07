function addScheduleEntry(event) {
  event.preventDefault(); // Prevenir envío del formulario
  
  // Obtener valores del formulario
  const date = document.getElementById('date').value;
  const startTime = document.getElementById('time-start').value;
  const endTime = document.getElementById('time-end').value;
  const activity = document.getElementById('activity').value;
  const place = document.getElementById('place').value;
  const type = document.getElementById('type').value;
  const notes = document.getElementById('notes').value;
  const flagColor = document.getElementById('flag').value;
  const isBusy = document.getElementById('free-busy').checked;
  
 
  const table = document.querySelector('#scheduleTable tbody');
  const newRow = table.insertRow();

  
  const dateCell = newRow.insertCell(0);
  const startCell = newRow.insertCell(1);
  const endCell = newRow.insertCell(2);
  const activityCell = newRow.insertCell(3);
  const placeCell = newRow.insertCell(4);
  const typeCell = newRow.insertCell(5);
  const notesCell = newRow.insertCell(6);
  const flagCell = newRow.insertCell(7);
  const statusCell = newRow.insertCell(8);
  
  dateCell.innerHTML = formatDate(date);
  startCell.innerHTML = startTime;
  endCell.innerHTML = endTime;
  activityCell.innerHTML = activity;
  placeCell.innerHTML = place || '-';
  typeCell.innerHTML = type;
  notesCell.innerHTML = notes || '-';
  flagCell.innerHTML = `<div style="background-color:${flagColor}; width: 20px; height: 20px; border-radius: 3px; margin: 0 auto;"></div>`;
  statusCell.innerHTML = isBusy ? 'busy' : 'free';
  
    
  document.querySelector('form').reset();
  
  document.getElementById('flag').value = '#ff0000';
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', options);
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  form.addEventListener('submit', addScheduleEntry);
  
  const clearButton = form.querySelector('button[type="reset"]');
  clearButton.addEventListener('click', function() {
    document.getElementById('flag').value = '#ff0000';
  });
});