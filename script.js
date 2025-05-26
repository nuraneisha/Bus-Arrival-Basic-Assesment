const id = document.getElementById('busStopId');

async function getData(id) {
  const response = await fetch(`https://sg-bus-arrivals.vercel.app/?id=${id}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Fail to fetch the API');
  }
}

// Render bus arrival data into the table
async function showArrival() {
  const busStopId = id.value.trim();

  if (!busStopId) {
    alert('Please enter a valid bus stop ID');
    return;
  }
  try {
    const data = await getData(busStopId);
    const buses = data.services;

    // Sort buses by arrival time
    buses.sort((a, b) => a.next_bus_mins - b.next_bus_mins);

    //get table body
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';

    for (const bus of buses) {
      const tr = document.createElement('tr');

      //Bus number cell
      const tdNumber = document.createElement('td');
      tdNumber.textContent = bus.bus_no;
      tr.appendChild(tdNumber);

      //operator cell
      const tdCell = document.createElement('td');
      tdCell.textContent = bus.operator;
      tr.appendChild(tdCell);

      //Arrival Time cell
      const tdArrival = document.createElement('td');
      if (bus.next_bus_mins <= 0) {
        tdArrival.textContent = 'Arrival';
        //Add the highlighted cell
        tr.classList.add('highlighted');
      } else {
        tdArrival.textContent = bus.next_bus_mins;
      }
      tr.appendChild(tdArrival);
      tbody.appendChild(tr);
    }
  } catch (error) {
    alert(error.message);
  }
}
