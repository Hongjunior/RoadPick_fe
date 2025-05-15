import axios from 'axios'

const SERVICE_KEY = import.meta.env.VITE_TOUR_API

export const getTourList = async ({ areaCode, contentTypeId }) => {
  const response = await axios.get('https://apis.data.go.kr/B551011/KorService2/areaBasedList2', {
    params: {
      MobileOS: 'ETC',
      MobileApp: 'LoadPick',
      _type: 'json',
      contentTypeId,
      areaCode,
      arrange: 'B', // 인기순
      numOfRows: 20,
      serviceKey: SERVICE_KEY,
    },
  })

  const items = response.data.response.body.items.item || []

  // 이미지 있는 항목 중 상위 10개만
  const filtered = items.filter(item => item.firstimage).slice(0, 10)

  return filtered
}
