import {useState} from 'react'

function HookModal(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return {
    isOpen,
    openModal,
    closeModal,
  }
}

export default HookModal