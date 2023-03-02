import Card from "../Layout/Card";

export default function TakeoutMenu(props) {
  return (
    <>
      {props.data.map((itemType) => (
        <Card key={itemType.id}>
          <h2>{itemType.properties.Type.title[0].plain_text}</h2>
          <h3>Oroshi Katsu</h3>
        </Card>
      ))}
    </>
  );
}
