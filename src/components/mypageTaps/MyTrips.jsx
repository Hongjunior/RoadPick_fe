import css from './mypageTaps.module.css'
import { useEffect, useState } from 'react'
import PlusBtnIcon from '@/assets/icons/PlusBtnIcon.svg?react'
import TripListImg from '@/assets/imgs/TripListImg.png'
import MypageListCard from './MypageListCard'
import { deleteSchedule } from '@/apis/scheduleApi'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const MyTrips = ({ setAlertMessage, schedules }) => {
  const [trips, setTrips] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    // schedules가 바뀔 때마다 로컬 상태에도 반영
    if (schedules) {
      const sorted = [...schedules].sort((a, b) => new Date(a.start) - new Date(b.start)) // 날짜순 정렬
      setTrips(sorted)
    }
  }, [schedules, setTrips])

  useEffect(() => {
    if (location.state?.fromRegister) {
      setAlertMessage('여행 일정이 등록되었습니다.')
      navigate(location.pathname, { replace: true })
    }
  }, [location, navigate, setAlertMessage])
  const handleDelete = async scheduleId => {
    if (!scheduleId) return
    try {
      const response = await deleteSchedule(scheduleId)
      setTrips(prevTrips => prevTrips.filter(trip => trip.tripId !== scheduleId))
      setAlertMessage('일정이 삭제되었습니다.')
      console.log('삭제 성공:', response.data)
    } catch (err) {
      console.error('삭제 실패:', err.response?.data || err.message)
    }
  }
  const handleGoToCreateTrip = () => {
    navigate('/selectDate')
  }

  return (
    <div className={css.listContainer}>
      <div className={css.tripCreateCard} onClick={handleGoToCreateTrip}>
        <div className={css.plusIcon}>
          <PlusBtnIcon />
        </div>
        <div>
          <h4>여행 일정 만들기</h4>
          <p>새로운 여행을 떠나보세요.</p>
        </div>
      </div>
      {trips.length === 0 ? (
        <div className={css.empty} onClick={handleGoToCreateTrip}>
          <div className={css.emptyOverlay}>
            <PlusBtnIcon className={css.plusIcon} />
          </div>
          <p>다가오는 여행이 없습니다.</p>
          <p>여행 일정을 생성해보세요!</p>
        </div>
      ) : (
        <>
          <h3 className={css.title}>다가오는 여행</h3>
          <div className={css.tripList}>
            <div className={css.listTile}>
              {trips.map(trip => (
                <MypageListCard
                  key={trip.tripId}
                  trip={trip}
                  thumbnail={<img src={TripListImg} alt="여행 이미지" />}
                  info={
                    <>
                      <h4>{trip.title}</h4>
                      <p>
                        {trip.start} ~ {trip.end}
                      </p>
                    </>
                  }
                  renderMoreMenu={() => (
                    <button onClick={() => handleDelete(trip.tripId)}>일정 삭제</button>
                  )}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MyTrips
