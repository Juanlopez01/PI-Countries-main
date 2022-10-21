import React from 'react'
import style from './ActivityCard.module.css'


function ActivityCard({activity}) {

   function activityRating() {
    switch(activity.difficulty){
        case 1:
            return <p className={style.rating}>★</p>;
        case 2:
            return <p className={style.rating}>★★</p>;
        case 3:
            return <p className={style.rating}>★★★</p>;
        case 4:
            return <p className={style.rating}>★★★★</p>;
        case 5:
            return <p className={style.rating}>★★★★★</p>;
    }     
    }

console.log(activity.image);
  return (
    <div className={style.container}>
        <h4>{activity.name}</h4>
        <img src={activity.image} alt={activity.name}/>
        <p>Duration: {activity.duration} min</p>
        <p>Season: {activity.season}</p>
        {activityRating()}
    </div>
  )
}

export default ActivityCard