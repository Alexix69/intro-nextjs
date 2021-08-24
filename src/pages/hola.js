import Link from "next/link";
import Head from "next/head";

const HelloPage = () => {
  return (
    <>
      <Head>
        <title>Hola</title>
      </Head>

      <div>
        Hola Mundo!
        <p>
          Ir a index <Link href="/">aquí</Link>
        </p>
      </div>
    </>
  );
};

export default HelloPage;
