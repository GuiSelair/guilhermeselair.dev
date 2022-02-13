import style from "./style.module.scss";

interface ILabel {
  text: string;
}

function Label({ text }: ILabel) {
  return (
    <div className={style.container}>
      <span>{text}</span>
    </div>
  );
}

export default Label;
