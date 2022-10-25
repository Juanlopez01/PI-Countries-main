import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import {updateActivity, deleteActivity } from '../../../redux/actions/actions';
import style from './ActivityCard.module.css'
import HookModal from './Modal/HookModal';
import ModalCard from './Modal/ModalCard';



function ActivityCard({activity}) {
    const {isOpen, openModal, closeModal} = HookModal(false)
    const dispatch = useDispatch()
    const [difficulty, setDifficulty] = useState(0);
    const [hover, setHover] = useState(0);
    const [error, setError] = useState({
        name: false,
        duration:false,
    })
    const [input, setInput] = useState({
        name: '',
        duration: '',
        image: activity.image
    })

    const inputHandler = (event) => {
        switch(event.target.name){
            case 'name':
                const regExp = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
                if(event.target.value.match(regExp)){
                    setError({...error, name: false})
                    setInput({...input, name: event.target.value})
                } else {
                    setError({...error, name: true})
                    setInput({...input, name: event.target.value})
                }
                
                break;
            case 'duration':
                if(event.target.value <= 1440){
                    setError({...error, duration: false})
                    setInput({...input, duration: event.target.value})
                } else {
                        setError({...error, duration: true})
                        setInput({...input, duration: event.target.value})
                    }                
                break;
        }
    }

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

   const submitHandler = (event) => {
    event.preventDefault()
    input['difficulty'] = difficulty
    if(!error.name && !error.duration){
        dispatch(updateActivity(input, activity.id))
        setInput({
                name: '',
                duration: '',
                image: activity.image
            })
    }       
}

  return (
    <div className={style.container}>
        <h4>{activity.name}</h4>
        {activity.image !== 'image does not exist' && <img src={activity.image} alt={activity.name}/>}
        <p>Duration: {activity.duration} min</p>
        <p>Season: {activity.season}</p>
        {activityRating()}
        <div className={style.buttons__container}>
        <button className={style.action__buttons} onClick={openModal}>Modify</button>
        <button className={style.action__buttons} onClick={() => dispatch(deleteActivity(activity.id))}>Delete</button>
        </div>
        <ModalCard isOpen={isOpen} closeModal={closeModal}>
        <form onSubmit={submitHandler} className={style.modify__container}>
            <div className={!error.name? style.input__container : style.input__container__error}>
                <input type='text' name='name' value={input.name} onChange={(e) => inputHandler(e)}/>
                <label for="name" className={style.form__label}>
                    <span className={style.text__label}>Write a name</span>
                </label>
            </div>
            <div className={!error.duration? style.input__container : style.input__container__error}>
                <input type='number'  name='duration' value={input.duration} onChange={(e) => inputHandler(e)}/>
                <label for="duration" className={style.form__label}>
                    <span className={style.text__label}>Write a duration (min)</span>
                </label>
            </div>
            <div className={style.star__rating}>
                    {[...Array(5)].map((star, index) => {
                        let on = style.on
                        let off = style.off
                        index += 1;
                        return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || difficulty) ? on : off}
                            onClick={() => setDifficulty(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(difficulty)}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                        );
                    })}
                </div>
                <button className={style.action__buttons} type='SUBMIT'>Update</button>
            </form>
        </ModalCard>
    </div>
  )
}

export default ActivityCard