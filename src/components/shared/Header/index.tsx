import { FaWhatsappSquare, FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";

import style from "./style.module.scss";

const Header = () => {
  const router = useRouter();

  return (
    <header className={style.container}>
      <div>
        <div className={style.leftSide}>
          <button type="button" title="Voltar" onClick={() => router.push("/")}>
            <HiArrowNarrowLeft />
          </button>
          <a href="mailto:contato@guilhermeselair.dev">contato@guilhermeselair.dev</a>
        </div>
        <div className={style.rightSide}>
          <a title="Entrar em contato por whatsapp" href="https://www.api.whatsapp.com" target="_blank" rel="noreferrer">
            <FaWhatsappSquare />
          </a>
          <a title="Entrar em contato pelo Linkedin" href="https://www.linkedin.com/in/guilherme-selair/" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
          <a title="Entrar em contato pelo Linkedin" href="https://github.com/GuiSelair" target="_blank" rel="noreferrer">
            <FaGithubSquare />
          </a>
          <button type="button" onClick={() => router.push("/contato")}>CONTATO</button>
        </div>
      </div>
    </header>
  );
};
export default Header;
