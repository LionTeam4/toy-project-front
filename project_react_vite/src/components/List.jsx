// 기존 festivals 전용 → 범용 List로 수정
// 사용법: <List items={배열} renderItem={(item) => <Card>...</Card>} />
const List = ({ items, renderItem }) => {
  if (!items || items.length === 0) {
    return <p>목록이 없습니다.</p>
  }

  return (
    <div>
      {items.map((item, index) => (
        <div key={item.id ?? index}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}

export default List