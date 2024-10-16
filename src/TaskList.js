//maps over tasks from server and renders on page
import React from "react";
import Task from './Task';

function TaskList({tasks, handleDelete}) {
    console.log(tasks)
    const sortedTasks = Array.isArray(tasks) ? tasks.sort((a, b) => {
        const dateComparison = new Date(a.taskDate) - new Date(b.taskDate);
        
        if (dateComparison !== 0) {
            return dateComparison; 
        }
        
        // If dates are the same, sort by time
        return a.taskTime.localeCompare(b.taskTime);
    }) : [];

    // Convert 24-hour format to 12-hour format with AM/PM
    const convertTo12Hour = (time) => {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;  // Convert 0 to 12 for 12 AM, and handle hours past 12
        return `${hours}:${minutes} ${ampm}`;
    };

    const convertDate = (date) => {
        console.log(date)
        let [year, month, day] = date.split('-');
        year = parseInt(year)
        day = parseInt(day)

        switch (month) {
            case '01':
                month = "January";
                break;
            case '02':
                month = "February";
                break;
            case '03':
                month = "March";
                break;
            case '04':
                month = "April";
                break;
            case '05':
                month = "May";
                break;
            case '06':
                month = "June";
                break;
            case '07':
                month = "July";
                break;
            case '08':
                month = "August";
                break;
            case '09':
                month = "September";
                break;
            case '10':
                month = "October";
                break;
            case '11':
                month = "November";
                break;
            case '12':
                month = "December";
                break;
            default:
                month = "Invalid month";

        }
        
        return `${month}, ${day} ${year}`;
    }

    return (
        <div>
            {sortedTasks.map(task => {
                return (
                    <Task 
                        key={task.id} 
                        task={{
                            ...task,
                            taskDate: convertDate(task.taskDate),
                            taskTime: convertTo12Hour(task.taskTime)
                        }} 
                        handleDelete={handleDelete}
                    />
                );
            })}
        </div>
    );
};

export default TaskList;