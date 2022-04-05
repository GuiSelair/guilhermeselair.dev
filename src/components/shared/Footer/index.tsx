import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaDev } from "react-icons/fa";

import style from "./styles.module.scss";

export default function Footer() {
  return (
    <footer className={style.container}>
      <div>
        <span>© Guilherme Selair. 2022</span>
      </div>
      <div>
        <a
          href="https://github.com/GuiSelair"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/guilherme-selair/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillLinkedin />
        </a>
        <a
          href="https://dev.to/guiselair"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDev />
        </a>
      </div>
    </footer>
  );
}
