import style from "./style.module.scss";

interface ILabel {
  text: string;
	size?: "sm" | "md";
}

function Label({ text, size = "sm" }: ILabel) {
  return (
    <div className={style.container} data-size={size}>
      <span>{text}</span>
    </div>
  );
}

export default Label;
