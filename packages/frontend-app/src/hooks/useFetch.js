// import { computed, reactive, ref, watch } from "vue";

// export default function useFetch(
//   url = '/',
//   options = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization" : undefined
//     },
//     body: null,
//   }
// ) {
//   const fullUrl = computed( ()=>{
//     return "http://localhost:8081/api" + url;
//   })

//   const loading = ref(false);
//   const error = ref(null);
//   const data = ref(null);
//   const response = reactive({
//     ok: null,
//     status: null,
//     statusText: null
//   });


//   function fetchData(){
//     loading.value = true;
//     try {
//       fetch( fullUrl.value, options)
//       .then( res => {
//           response.status = res.status,
//           response.ok = res.ok
//           response.statusText = res.statusText
  
//           if (!res.ok) {
//             throw new Error(res.status + ' '+ res.statusText)
//           }
//           return res.json()
//         }
//       )
//       .then( resData => {
//         console.log( resData )
//         data.value = resData
//       })
//       .catch( err => error.value = err.message )
//       .finally( ()=> loading.value = false)
//     } catch (err){}
//   }

//   fetchData() // First fetch
//   watch(
//     [fullUrl], 
//     () => fetchData(),
//   );


//   return {
//     data,
//     loading,
//     response,
//     error,
//     refetch: fetchData,
//   };
// }
