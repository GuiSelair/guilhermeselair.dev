import styles from "./styles.module.scss";

export default function DownloadProfessionalResumeBanner() {
  return (
    <div className={styles.container}>
      <div>
        <h4>Prefere da maneira tradicional?</h4>
        <span>Sem problemas, baixe meu currículo em PDF</span>
      </div>
      <button type="button">Baixar currículo</button>
    </div>
  );
}
