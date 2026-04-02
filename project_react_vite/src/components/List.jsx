import Card from "./Card";

const List = ({festivals}) => {
  return (
    <div>
        {festivals.map((f, i) => (
            <Card
            key = {i}
            title={f.title}
            date={f.date}
            location={f.location}
            />
        ))}
    </div>
  );
};

export default List;