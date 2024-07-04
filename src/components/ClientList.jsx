import { Link } from 'react-router-dom'

const ClientList = ({ clients }) => {
  const clientContainer =
    'w-full m-4 p-1 min-h-[500px] flex flex-col justify-start items-center rounded-lg border-4 border-double border-main-orange'
  const headerContainer =
    'flex flex-row py-1 justify-between items-center w-full border-b-2 border-main-orange'
  const headerLabel = 'w-1/3 font-bold text-main-orange text-center'

  return (
    <div className={clientContainer}>
      <div className={headerContainer}>
        <span className={headerLabel}>Client Name</span>
        <span className={headerLabel}>Client Email</span>
        <span className={headerLabel}>Client Phone</span>
      </div>
      {clients.map((client) => (
        <Link
          to={`/client/${client.id}`}
          key={client.id}
          className={'flex flex-row justify-between items-center w-full'}>
          <span className={'w-1/3 text-center'}>{client.name}</span>
          <span className={'w-1/3 text-center'}>{client.email}</span>
          <span className={'w-1/3 text-center'}>{client.phone}</span>
        </Link>
      ))}
    </div>
  )
}

export default ClientList
