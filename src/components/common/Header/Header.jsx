import React from 'react'
import { useNavigate } from 'react-router-dom'
import css from './Header.module.css'
import ArrowLeftIcon from '@/assets/icons/arrowLeftIcon.svg?react'
import LogoutIcon from '@/assets/icons/logoutIcon.svg?react'

const Header = ({
  title,
  showButton = false,
  buttonText = '일정 추가',
  onButtonClick,
  showIcon = false,
  iconSvg = <LogoutIcon />,
  onIconClick,
  buttonTextClassName = '',
}) => {
  const navigate = useNavigate()
  const backPage = () => {
    navigate(-1)
  }
  return (
    <div className={css.head}>
      <ArrowLeftIcon onClick={backPage} className={css.arrowLeftIcon} />
      {title && <p>{title}</p>}
      <div className={css.rightSection}>
        {showButton && (
          <button className={css.plus} onClick={onButtonClick}>
            <span className={buttonTextClassName}>{buttonText}</span>
          </button>
        )}
        {showIcon && (
          <button className={css.icon} onClick={onIconClick}>
            {iconSvg}
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
