// Calendar.tsx
import React from 'react'
import css from './Calendar.module.css'
import generateMonth from './generateMonth'

const Calendar = ({ schedules = [], SelectDate, start, end }) => {
  const currentDate = new Date() // 현재 날짜 기준으로 잡기
  const startYear = currentDate.getFullYear()
  const startMonth = currentDate.getMonth() // 0부터 시작
  const days = ['일', '월', '화', '수', '목', '금', '토']
  const endYear = startYear + 1 // 내년
  const months = []

  // 올해부터 내년까지 월은 0부터 시작
  for (let year = startYear; year <= endYear; year++) {
    const fromMonth = year === startYear ? startMonth : 0
    const toMonth = year === endYear ? 11 : 11

    for (let month = fromMonth; month <= toMonth; month++) {
      months.push({ year, month })
    }
  }

  /*스케줄 날짜가 일정 범위에 포함되는지 검사하는 함수 */
  const getSchedulesForDate = dateString => {
    const currentDate = new Date(dateString)
    return schedules?.filter(({ start, end }) => {
      const startDate = new Date(start)
      const endDate = new Date(end)
      return currentDate >= startDate && currentDate <= endDate
    })
  }
  const isInSelectedRange = (date, start, end) => {
    if (!start || !end || !date) return false
    const d = new Date(date)
    const s = new Date(start)
    const e = new Date(end)
    return s <= d && d <= e
  }

  console.log(start, end)
  return (
    <div className={css.container}>
      {months.map(({ year, month }) => {
        const dates = generateMonth(year, month) // 해당년도 해당월의 날짜들 가져옴
        const monthLabel = `${year}년 ${month + 1}월`
        return (
          <section key={`${year}-${month}`} className={css.monthsection}>
            <p className={css.monthtitle}>{monthLabel}</p>
            <div className={css.days}>
              {days.map(day => {
                const weekend = day === days[0] || day === days[6] // 일요일 또는 토요일
                return (
                  <div key={day} className={`${css.daylabel} ${weekend ? css.weekend : ''}`}>
                    {day}
                  </div>
                )
              })}
              {dates.map(date => {
                const dateString = date ? date.toISOString().split('T')[0] : null
                const schedulesForDate = dateString ? getSchedulesForDate(dateString) : []
                const inSelectedRange = isInSelectedRange(dateString, start, end)
                const hasSchedule = schedulesForDate.length > 0
                const dayOfWeek = date ? date.getDay() : null
                const isWeekEnd = dayOfWeek === 0 || dayOfWeek === 6
                return (
                  <div
                    key={dateString || `empty-${Math.random()}`}
                    className={`${css.datecell} ${hasSchedule ? css.hasschedule : ''}  ${inSelectedRange ? css.selectedrange : ''}`}
                    onClick={() => SelectDate(dateString)}
                  >
                    {date && (
                      <span className={`${css.datenumber} ${isWeekEnd ? css.enddate : ''}`}>
                        {date.getDate()}
                      </span>
                    )}
                    {schedulesForDate.map((day, index) => {
                      const isStart = day.start === dateString
                      return (
                        <div key={index} className={`${css.schedulebar} `}>
                          {isStart && (
                            <span className={`${css.scheduletext} ${css.start}`}>{day.title}</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default Calendar
