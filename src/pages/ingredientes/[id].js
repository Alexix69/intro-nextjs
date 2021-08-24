import React from "react";
import { useRouter } from "next/router";
import api from "../../api";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url) =>
  api
    .get(url, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9uYW1lbGVzcy1mb3J0cmVzcy04NTE1OS5oZXJva3VhcHAuY29tXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjI5NDgwOTkxLCJleHAiOjE2Mjk0ODQ1OTEsIm5iZiI6MTYyOTQ4MDk5MSwianRpIjoidThpUHBKeG1sS3d2M0UwZSIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.eJRkhHItOLkSmJzMSdyQw-otBlsMocauKKbJpM6NfT0",
      },
    })
    .then((res) => res.data);

const IngredientDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/ingredients/${id}`, fetcher);

  if (error) {
    return "Ocurrió un error!";
  }

  if (!data) {
    return "Cargando datos ...";
  }

  return (
    <div>
      <Image src={data.image} width={400} height={300} />
      <p>Nombre : {data.name}</p>
      <button onClick={() => router.push("/ingredientes")}>
        Regresar a la lista de ingredientes
      </button>
    </div>
  );

  // => NO ES NECESARIO useEffect CON useState PORQUE SWR HACE EL MISMO TRABAJO DE MEJOR MANERA
  // const [ingredient, setIngredient] = useState(null);
  // useEffect(() => {
  //   const getData = async () => {
  //     if (id) {
  //       try {
  //         const response = await api.get(`/ingredients/${id}`, {
  //           headers: {
  //             Authorization:
  //               "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9uYW1lbGVzcy1mb3J0cmVzcy04NTE1OS5oZXJva3VhcHAuY29tXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjI5Mzc2NjkzLCJleHAiOjE2MjkzODAyOTMsIm5iZiI6MTYyOTM3NjY5MywianRpIjoidlJvc3kxYmpFSkdHSXFFZyIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.QYU3kF_fCH9AKA9VM7OvCp-f5jiiaKOrRX1DGovT9j4",
  //           },
  //         });
  //
  //         console.log("response", response);
  //         setIngredient(response.data);
  //       } catch (e) {}
  //     }
  //   };
  //
  //   getData();
  // }, [id]);
};

export default IngredientDetailPage;

// => SE USA getStaticProps Y getStaticPaths CUANDO LAS RUTAS SON PÚBLICAS
// export async function getStaticProps({ params }) {
//   let ingredient = null;
//
//   try {
//     console.log("params.id", params.id);
//     const response = await api.get(`/ingredients/${params.id}`, {
//       headers: {
//         Authorization:
//           "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9uYW1lbGVzcy1mb3J0cmVzcy04NTE1OS5oZXJva3VhcHAuY29tXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjI5Mzc2NjkzLCJleHAiOjE2MjkzODAyOTMsIm5iZiI6MTYyOTM3NjY5MywianRpIjoidlJvc3kxYmpFSkdHSXFFZyIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.QYU3kF_fCH9AKA9VM7OvCp-f5jiiaKOrRX1DGovT9j4",
//       },
//     });
//     console.log("response", response);
//     ingredient = response.data;
//   } catch (e) {}
//
//   return {
//     props: {
//       ingredient,
//     },
//
//     revalidate: 10,
//   };
// }
//
// export async function getStaticPaths() {
//   const response = await api.get("/ingredients");
//   const ingredients = response.data.data;
//
//   const paths = ingredients.map((ingredient) => ({
//     params: {
//       id: "" + ingredient.id,
//     },
//   }));
//
//   return { paths, fallback: "blocking" };
// }
