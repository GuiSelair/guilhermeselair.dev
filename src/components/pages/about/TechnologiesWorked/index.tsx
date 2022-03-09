import Image from "next/image";
import styles from "./styles.module.scss";

export default function TechnologiesWorked() {
  return (
    <section className={styles.tecnologiasTrabalhadas}>
      <h4>Tecnologias trabalhadas</h4>
      <div>
        <Image
          src="/images/thumbnails/Typescript-Thumb.png"
          width={49}
          height={49}
          title="Typescript"
        />
        <Image
          src="/images/thumbnails/React-Thumb.png"
          width={49}
          height={49}
          title="ReactJS"
        />
        <Image
          src="/images/thumbnails/NextJS-Thumb.png"
          width={49}
          height={49}
          title="NextJS"
        />
        <Image
          src="/images/thumbnails/Typescript-Thumb.png"
          width={49}
          height={49}
          title="Typescript"
        />
        <Image
          src="/images/thumbnails/Typescript-Thumb.png"
          width={49}
          height={49}
          title="Typescript"
        />
        <Image
          src="/images/thumbnails/Typescript-Thumb.png"
          width={49}
          height={49}
          title="Typescript"
        />
      </div>
    </section>
  );
}
