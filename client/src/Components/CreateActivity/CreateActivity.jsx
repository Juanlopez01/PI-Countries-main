import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { pageCountries, addActivity } from '../../redux/actions/actions';
import style from './CreateActivity.module.css';

function CreateActivity() {
    const dispatch = useDispatch()
    const country = useSelector(state => state.countriesLoaded)
    const [error, setError] = useState({
        name: false,
        duration:false,
    })
    const [difficulty, setDifficulty] = useState(0);
    const [hover, setHover] = useState(0);
    const [submit, setSubmit] = useState(false)
    const [input, setInput] = useState({
        name: '',
        duration: '',
        season: [],
        image:'image does not exist',
        codeCountry: []
    })
    let search = {
        order: 'AtoZ',
    }
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
            case 'image':
                setInput({...input, image: URL.createObjectURL(event.target.files[0])
                })
                break;
            default:
                setInput({...input, [event.target.name]:[...input[event.target.name],event.target.value]})
        }
        
    }
    const deleteCountryHandler = (event) => {
        const codesFiltered = input.codeCountry.filter(c => c !== event.target.name)
        setInput({...input, codeCountry: codesFiltered})
    }
    const deleteSeasonHandler = (event) => {
        const seasonFiltered = input.season.filter(s => s !== event.target.name)
        setInput({...input, season: seasonFiltered})
    }
    const submitHandler = (event) => {
        event.preventDefault()
        input['difficulty'] = difficulty
        if(!error.name && !error.duration){
            dispatch(addActivity(input))
            setSubmit(true)
            setInput({
                    name: '',
                    duration: '',
                    season: [],
                    image:'image does not exist',
                    codeCountry: []
                })
        }       
    }
    useEffect(()=>{
        dispatch(pageCountries(search))
    },[submit])

  return (
    <div className={style.form__background}>
        <form  onSubmit={submitHandler} className={style.form__container}>
            <h2>CREATE ACTIVITY</h2>

        <div className={!error.name? style.input__container : style.input__container__error}>
            <input type='text' name='name' value={input.name} onChange={(e) => inputHandler(e)} required/>
            <label for="name" className={style.form__label}>
                <span className={style.text__label}>Write a name</span>
            </label>
        </div>

        <div className={!error.duration? style.input__container : style.input__container__error}>
            <input type='number'  name='duration' value={input.duration} onChange={(e) => inputHandler(e)} required/>
            <label for="duration" className={style.form__label}>
                <span className={style.text__label}>Write a duration (min)</span>
            </label>
        </div>
            <label for="difficulty" className={style.form__label}>Choose a difficulty</label>
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

            <div className={style.input__container}>
            <input type='file'  name='image' accept="image/*" onChange={(e) => inputHandler(e)}/>
            </div>

            <label for="season" className={style.form__label}>Choose a season</label>
            <select className={style.form__inputs} name="season"  onChange={(e) => inputHandler(e)} required>
                <option key='nulll' value=""></option>
                <option key='summer' value="summer">Summer</option>
                <option key='fall' value="fall">Fall</option>
                <option key='winter' value="winter">Winter</option>
                <option key='spring' value="spring">Spring</option>
            </select>

            <label for="codeCountry" className={style.form__label}>Choose a country</label>
            <select className={style.form__inputs} name="codeCountry"  onChange={(e) => inputHandler(e)} required>
                <option key='null' value=""></option>
                {country && country[0] && country[0].map(pages => pages.map(c => {
                return <option key={c.id} value={c.id}>{c.name}</option>
                }))}
            </select>
            <button className={error.name || error.duration ? style.submit__button__error: style.submit__button} type='submit' disabled={error.name || error.duration || !input.name.length || !input.duration.length ? true : false }>Add Activity</button>
        </form>
        <div className={style.preview__card}>
            <h1>Preview</h1>
            {input.image !== 'image does not exist' && <img src={input.image} alt={input.name} className={style.image__preview}/>}
            <h3>{input.name}</h3>
            <p>Duration: {input.duration} min</p>
            <label>Season:</label>
            <ul className={style.preview__ul}>
                {input.season && input.season.map(seas => 
                <div className={style.preview__li}>
                <li key={seas} >{seas}</li>
                <button name={seas} className={style.preview__button} onClick={(e)=>deleteSeasonHandler(e)}>X</button>
                </div>)}
            </ul>
            <label>Countries:</label>
            <ul className={style.preview__ul}>
                {input.codeCountry && input.codeCountry.map(coun => {
                    let nameCoun = country[0].flat().filter(c => c.id === coun)
                    return <div className={style.preview__li} >
                    <li key={nameCoun[0].name}>{nameCoun[0].name}</li>
                    <button name={nameCoun[0].id} className={style.preview__button} onClick={(e)=>deleteCountryHandler(e)}
                     >X</button>
                    </div>
                })}
            </ul>
        </div>
    </div>
  )
}

export default CreateActivity