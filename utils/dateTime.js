module.exports = {
    formatDate: (date) =>{
        const d = new Date(date);
        const formattedDate = `${d.getMonth() +1}/${d.getDate()}/${d.getFullYear()}`;
        const hours = d.getHours().toString().padStart(2,'0');
        const min = d.getMinutes().toString().padStart(2,'0');
        const formatTime = `${hours}:${min}`;

        return `${formattedDate} at ${formatTime}`;
    },
};
