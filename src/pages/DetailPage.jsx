import { useTourDetail } from '@/hooks/useTourDetail'
import React from 'react'
import { useParams } from 'react-router-dom'
import css from './DetailPage.module.css'
import { useLocationTourList } from '@/hooks/useLocationTourList'
import DetailHeader from '@/components/detail/Header/DetailHeader'
import DetailImage from '@/components/detail/DetailImage/DetailImage'
import DetailTitle from '@/components/detail/DetailTitle/DetailTitle'
import DetailContent from '@/components/detail/DetailContent/DetailContent'

const DetailPage = () => {
  const { contentid, contenttypeid } = useParams() // 파라미터 정보 받아옴
  const { commonData, introData, loading, error } = useTourDetail(contentid, contenttypeid)
  const common = commonData?.[0]
  const mapx = common?.mapx
  const mapy = common?.mapy
  const { data: festivals, isLoading, isError } = useLocationTourList(mapx, mapy, 5000, 15)

  if (isLoading || loading) return <p>로딩 중...</p>
  if (isError || error) return <p>에러 발생</p>
  if (!festivals || festivals.length === 0) return <p>페스티벌 정보가 없습니다.</p>

  return (
    <main className={css.container}>
      <DetailHeader />
      <DetailImage common={commonData[0]} />
      <DetailTitle common={commonData[0]} />
      <p className={css.addr}>{commonData[0].addr1}</p>
      <DetailContent
        common={commonData[0]}
        festivals={festivals}
        contenttypeid={contenttypeid}
        intro={introData[0]}
      />
    </main>
  )
}

export default DetailPage
