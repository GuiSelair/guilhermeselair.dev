import { memo } from "react";
import style from "./style.module.scss";

interface BadgeProps {
  text: string;
	size?: "sm" | "md";
}

function BadgeWithoutMemo({ text, size = "sm" }: BadgeProps) {
  return (
    <div className={style.container} data-size={size}>
      <span>{text}</span>
    </div>
  );
}

export const Badge = memo(BadgeWithoutMemo);
