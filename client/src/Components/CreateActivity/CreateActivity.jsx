import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { pageCountries, addActivity } from '../../redux/actions/actions';
import style from './CreateActivity.module.css';
import {arrayNonRepeat} from './controllers'

function CreateActivity() {
    const dispatch = useDispatch()
    const country = useSelector(state => state.countriesLoaded)
    const [error, setError] = useState({
        name: true,
        duration:true,
        image: true
    })
    const [difficulty, setDifficulty] = useState(0);
    const [hover, setHover] = useState(0);
    const [submit, setSubmit] = useState(false)
    const [input, setInput] = useState({
        name: '',
        duration: '',
        season: [],
        image:'',
        review:'',
        codeCountry: []
    })
    let search = {
        order: 'AtoZ',
    }
    const regExpName = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
    const regExpUrl = /^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.[a-z]{2,10}(:\d{2,5})?(\/.*)?$/i; 
    const inputHandler = (event) => {
        switch(event.target.name){
            case 'name':
                if(event.target.value.match(regExpName)){
                    setError({...error, name: false})
                    setInput({...input, name: event.target.value})
                } else {
                    setError({...error, name: true})
                    setInput({...input, name: event.target.value})
                }
                
                break;
            case 'review':
                setInput({...input, review: event.target.value})
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
                if(event.target.value.match(regExpUrl)){
                    setError({...error, image: false})
                   setInput({...input, image: event.target.value}) 
                } else {
                    setError({...error, image: true})
                   setInput({...input, image: event.target.value}) 
                }
                
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
        const codes = arrayNonRepeat(input.codeCountry)
        const seasons = arrayNonRepeat(input.season)
        input.season = seasons
        input.codeCountry = codes
        input['difficulty'] = difficulty
        if(!error.name && !error.duration && difficulty > 0){
            dispatch(addActivity(input))
            setSubmit(true)
            setInput({
                    name: '',
                    duration: '',
                    season: [],
                    image:'',
                    review:'',
                    codeCountry: []
                })
        } else {
            setSubmit(false)
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

        {/* <div className={style.input__container}>
            <input type='text'  name='review' value={input.review} onChange={(e) => inputHandler(e)}/>
            <label for="review" className={style.form__label}>
                <span className={style.text__label}>Write a review</span>
            </label>
        </div> */}

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

            <div className={!error.image? style.input__container : style.input__container__error}>
            <input type='text'  name='image' value={input.image} onChange={(e) => inputHandler(e)}/>
            <label for="image" className={style.form__label}>
                <span className={style.text__label}>Import an image URL</span>
            </label>
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
            <button className={error.name || error.duration || !difficulty ? style.submit__button__error: style.submit__button} type='submit' disabled={error.name || error.duration || !input.name.length || !input.duration.length ? true : false }>Add Activity</button>
        </form>
        <div className={style.preview__card}>
            <h1>Preview</h1>
            {input.image.match(regExpUrl) && <img src={input.image} alt={input.name} className={style.image__preview}/>}
            <h3>{input.name}</h3>
            <p>Duration: {input.duration} min</p>
            <label>Season:</label>
            <ul className={style.preview__ul}>
                {input.season && arrayNonRepeat(input.season).map(seas => 
                <div className={style.preview__li}>
                <li key={seas} >{seas}</li>
                <button name={seas} className={style.preview__button} onClick={(e)=>deleteSeasonHandler(e)}>X</button>
                </div>)}
            </ul>
            <label>Countries:</label>
            <ul className={style.preview__ul}>
                {input.codeCountry && arrayNonRepeat(input.codeCountry).map(coun => {
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