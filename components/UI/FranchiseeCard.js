import Card from "../Layout/Card";
import styles from "./FranchiseeCard.module.css";

export default function FranchiseeCard(props) {
  const franchiseeData = props.data;
  const cardClasses = styles["franchisee-card"] + " " + props.className;
  return (
    <Card className={cardClasses}>
      <h4>{franchiseeData[0].content[0]}</h4>
      <p>
        {franchiseeData[0].content[1]}{" "}
        <a href={`mailto:${franchiseeData[0].content[2]}`}>
          {franchiseeData[0].content[2]}
        </a>
      </p>
    </Card>
  );
}
