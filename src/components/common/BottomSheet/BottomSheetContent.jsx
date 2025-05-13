import React, { useState } from 'react'
import css from './BottomSheet.module.css'
import ListCard from '@/components/common/ListCard/ListCard'
import SortDropdown from './SortDropdown'

const BottomSheetContent = ({ list }) => {
  const [sortBy, setSortBy] = useState('name')

  return (
    <div className={css.contentWrapper}>
      {/* 카테고리 탭 */}
      <div className={css.tabWrapper}>
        <button className={css.tabButton}>관광지</button>
        <button className={css.tabButton}>축제/행사</button>
      </div>

      {/* 타이틀 + 정렬 */}
      <div className={css.headerRow}>
        <h2 className={css.title}>서울 유명 관광지</h2>
        <SortDropdown sortBy={sortBy} onChange={setSortBy} />
      </div>

      {/* 리스트 영역 */}
      <div className={css.listWrapper}>
        {list.map((item, idx) => (
          <div key={idx} className={css.listItemPlaceholder}>
            <ListCard key={idx} {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomSheetContent
