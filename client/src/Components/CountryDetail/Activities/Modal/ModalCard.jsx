import React from 'react'
import style from './ModalCard.module.css'

function ModalCard({children, isOpen, closeModal}) {
  return (
    <div className={isOpen ? style.background__container : style.modal__close}>
        <div className={style.card__container}>
            <button onClick={closeModal} className={style.close__button}>X</button>
            {children}
        </div>
    </div>
  )
}

export default ModalCard