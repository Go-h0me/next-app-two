
export async function getAllEvents() {
  const response = await fetch(
    "https://next-course-9e669-default-rtdb.firebaseio.com/events.json"
  );
  // const data = await response.json();

  const data= 
  {"e1":{"date":"2021-05-12","description":"Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.","image":"images/coding-event.jpg","isFeature":false,"location":"Somestreet 25, 12345 San Somewhereo","title":"Programming for everyone"},"e2":{"date":"2021-05-30","description":"We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!","image":"images/introvert-event.jpg","isFeatured":true,"location":"New Wall Street 5, 98765 New Work","title":"Networking for introverts"},"e3":{"date":"2022-04-10","description":"You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.","image":"images/extrovert-event.jpg","isFeatured":true,"location":"My Street 12, 10115 Broke City","title":"Networking for extroverts"}}
  
  const events = [];

  for (const key in data) {
      events.push({
          id:key,
          ...data[key]
      })
  }
  return events;
}

export async function getFeaturedEvents() {
    const allEvents =await getAllEvents();
 return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
    const allEvents =await getAllEvents();

    return allEvents.find((event) => event.id === id);
  }
  
  export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;

    const allEvents = await getAllEvents();
  
    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }