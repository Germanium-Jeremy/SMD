export default function (timestamp) {
     const date = new Date(timestamp);
     
     const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
     const formattedDate = new Intl.DateTimeFormat('en-Br', options).format(date);
     
     return formattedDate;
}