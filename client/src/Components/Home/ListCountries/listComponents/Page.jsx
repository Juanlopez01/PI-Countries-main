import React, {useState, useEffect} from 'react'
import style from './Page.module.css'
import {Link} from 'react-router-dom'

const Page = ({countries}) => {
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    let numPages = countries.length
    
    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 100)
    }, [countries, page])
    
    const buttonFunction =() => {
        if(numPages > 2){
            switch(page){
                case 1:
                    return (
                    <>
                    <button name={page.toString()} onClick={()=> setPage(page)}>{page}</button>
                    <button name={(page + 1).toString()} onClick={()=> setPage(page + 1)}>{page + 1}</button>
                    <button name={(page + 2).toString()} onClick={()=> setPage(page + 2)}>{page + 2}</button>
                    <button >...</button>
                    <button name={numPages.toString()} onClick={()=> setPage(numPages)}>{numPages}</button>
                    </>);
                
                case numPages:
                    return(
                        <>
                    <button name='1' onClick={()=> setPage(1)}>1</button>
                    <button >...</button>
                    <button name={(numPages - 2).toString()} onClick={()=> setPage(numPages - 2)}>{numPages - 2}</button>
                    <button name={(numPages - 1).toString()} onClick={()=> setPage(numPages - 1)}>{numPages - 1}</button>
                    <button name={numPages.toString()} onClick={()=> setPage(numPages)}>{numPages}</button>
                    </>);
        
                default:
                    return(
                    <>
                    {page > 2 && <><button name='1' onClick={()=> setPage(1)}>1</button>
                    <button>...</button></>}
                    <button name={(page - 1).toString()} onClick={()=> setPage(page - 1)}>{page - 1}</button>
                    <button name={page.toString()} onClick={()=> setPage(page)}>{page}</button>
                    <button name={(page + 1).toString()} onClick={()=> setPage(page + 1)}>{page + 1}</button>
                    {page < numPages - 1 && <><button>...</button>
                    <button name={numPages.toString()} onClick={()=> setPage(numPages)}>{numPages}</button></>}
                    </>)
            }
        } else if(numPages === 2){
            return (
                <>
                <button name={page.toString()} onClick={()=> setPage(page)}>{page}</button>
                <button name={(page + 1).toString()} onClick={()=> setPage(page + 1)}>{page + 1}</button>
                </>)
        } else {
            return (
                <>
                <button name={page.toString()} onClick={()=> setPage(page) }>{page}</button>
                </>)
        }
    }



  return (
    <>
    <div className={style.container}>
        <div className={style.page__container}>
            {!loading &&
            countries[page - 1]?.map(c => {
            return( 
            <Link to={`/countries/${c.id}`} className={style.link__card}>
            <div key={c.id} className={style.card}>
                <div className={style.img__container}>   
                    <img src={c.image} alt={c.name}/>
                </div>
                <div className={style.info__container}>
                <h4 key={c.id}><strong>{c.name}</strong></h4>
                <p>Continent: {c.continent.toUpperCase()}</p>
                <p>{c.id}</p>
                </div>
            </div>
            </Link>)
        })}
        </div>
        <div className={style.page__nav}>
        <button name='1' onClick={()=> setPage(1)}><img src='https://www.flaticon.es/svg/vstatic/svg/3916/3916756.svg?token=exp=1665675106~hmac=3adb666a5dc22c490e7fe214278435b0' /></button>
        <button name={page > 1 ? (page - 1).toString() : '1'} onClick={()=> {page !== 1 ? setPage(page - 1):setPage(1)}}><img src='https://www.flaticon.es/svg/vstatic/svg/3916/3916934.svg?token=exp=1665674781~hmac=b0bebc74ca3b0906226fdde279e1cd75' /></button>
        {buttonFunction()}
        <button name={page < numPages? (page + 1).toString(): numPages.toString()} onClick={()=> {page !== numPages ? setPage(page + 1) : setPage(numPages)}}><img src='https://www.flaticon.es/svg/vstatic/svg/3916/3916924.svg?token=exp=1665674791~hmac=1ea94dec3933f686fec639888afa56a1' /></button>
        <button name={numPages.toString()} onClick={()=> setPage(numPages)}><img src='https://www.flaticon.es/svg/vstatic/svg/3916/3916765.svg?token=exp=1665675165~hmac=46f94689d2284c2e21a559d3ecdc948f' /></button>
        </div>
        
    </div>
  </>)
}

export default Page