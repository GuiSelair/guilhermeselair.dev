import { AiOutlineWhatsApp, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { HiArrowNarrowLeft, HiOutlineLockClosed } from "react-icons/hi";
import { useRouter } from "next/router";
import Link from "next/link";

import style from "./style.module.scss";

function Header() {
  const router = useRouter();

  return (
    <header className={style.container}>
      <div className={style.leftSide}>
        <Link href="/">
          <a>S</a>
        </Link>
        {/* <button type="button" title="Voltar" onClick={() => router.back()}>
          <HiArrowNarrowLeft />
        </button> */}
      </div>
      <nav className={style.centerNav}>
        <ul>
          <li>
            <Link href="/about">
              <a className={style.isSelected}>
                <span>SOBRE</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a>
                <span>PROJETOS</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#" prefetch={false}>
              <a className={style.isDisabled} tabIndex={-1}>
                <span>
                  ARTIGOS
                  <HiOutlineLockClosed />
                </span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={style.rightSide}>
        <a
          title="Entrar em contato por Whatsapp"
          href="https://www.api.whatsapp.com"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineWhatsApp />
        </a>
        <a
          title="Veja meu Linkedin"
          href="https://www.linkedin.com/in/guilherme-selair/"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillLinkedin />
        </a>
        <a
          title="Veja meu Github"
          href="https://github.com/GuiSelair"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillGithub />
        </a>
      </div>
    </header>
  );
}
export default Header;
