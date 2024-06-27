import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { BASE_URL } from '../utils/fetches'

const SingleClient = () => {
  const { clientId } = useParams()
  const [client, setClient] = useState({})

  const getSingleClient = async (clientId) => {
    try {
      const response = await fetch(`${BASE_URL}/client/${clientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const newClient = await response.json()
      setClient(newClient)
    } catch (error) {
      console.error(error)
    }
  }

  // ### UPDATE OR REACTIVATE CLIENT

  // > Request:

  // ```js
  // fetch(`${url}/${clientId}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: {
  //     clientData: { ...clientData }
  //   }
  // })
  // // reactivate
  // fetch(`${url}/${clientId}?r=true`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  // })
  // ```

  useEffect(() => {
    if (!client.id || client.id !== clientId) {
      getSingleClient(clientId)
    }
  }, [client])
  return (
    <div>
      <p>this is a placeholder</p>
      <p>{'clientId: ' + clientId}</p>
      <p>{'client.id: ' + client.id}</p>
      <p>{'name: ' + client.name}</p>
      <p>{'email: ' + client.email}</p>
      <p>{'phone: ' + client.phone}</p>
    </div>
  )
}

export default SingleClient
