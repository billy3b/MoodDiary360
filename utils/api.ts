const createURL = (path) => window.location.origin + path

export const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const deleteEntry = async (id) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: 'DELETE',
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const newEntry = async () => {
 try{ 
  const res = await fetch(
    new Request(createURL('/api/entry'), {
      method: 'POST',
      body: JSON.stringify({ content: 'new entry' }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }} catch(error){
         throw new Error('Something went wrong on the client side.');
}
}

// export const newEntry = async () => {
//     try {
//       const res = await fetch(
//         new Request(createURL('/api/entry'), {
//           method: 'POST',
//           body: JSON.stringify({ content: 'new entry' }),
//         })
//       );
  
//       if (res.ok) {
//         return res.json();
//       } else {
//         // Log or inspect the response details
//         console.error('Error response:', res);
  
//         // Throw a more detailed error
//         const errorData = await res.json();
//         throw new Error(`Failed to create a new entry. Server error: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error('Error in newEntry function:', error);
//       throw new Error('Something went wrong on the client side.');
//     }
//   };
  

// export const updateEntry = async (id, updates) => {
//   const res = await fetch(
//     new Request(createURL(`/api/entry/${id}`), {
//       method: 'PATCH',
//       body: JSON.stringify({ updates }),
//     })
//   )

//   if (res.ok) {
//     return res.json()
//   } else {
//     throw new Error('Something went wrong on API server!')
//   }
// }

export const updateEntry = async (id, updates) => {
    try {
    const res = await fetch(
      new Request(createURL(`/api/entry/${id}`), {
        method: 'PATCH',
        body: JSON.stringify({ updates }),
      })
    );
  
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Something wrong on the API')
    }} catch(error){
        throw new Error('Failed to update entry. Server error')
    }
  };

export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL(`/api/question`), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}