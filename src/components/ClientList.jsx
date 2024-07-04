import { Link } from 'react-router-dom'

const ClientList = ({ clients }) => {
  const clientContainer =
    'w-full m-4 p-1 min-h-[500px] flex flex-col justify-start items-center rounded-lg border-4 border-double border-main-orange'
  const headerContainer =
    'flex flex-row p-1 justify-between items-center w-full border-b-2 border-main-orange'
  const headerLabel = 'w-1/3 font-bold text-main-orange '

  const clientMapCB = (client) => {
    const { id, name, email, phone } = client
    const props = {
      to: `/client/${id}`,
      className: 'flex flex-col w-full'
    }
    const textContainer =
      'flex flex-row justify-between items-center w-full px-1 my-1 border-b-[1px] border-main-orange'
    const textStyle = 'w-1/3 '
    return (
      <Link key={id} {...props}>
        <div className={textContainer}>
          <span className={textStyle + 'text-start'}>{name}</span>
          <span className={textStyle + 'text-center'}>{email}</span>
          <span className={textStyle + 'text-end'}>{phone}</span>
        </div>
      </Link>
    )
  }

  return (
    <div className={clientContainer}>
      <div className={headerContainer}>
        <span className={headerLabel + 'text-start'}>Client Name</span>
        <span className={headerLabel + 'text-center'}>Client Email</span>
        <span className={headerLabel + 'text-end'}>Client Phone</span>
      </div>
      {clients.filter((client) => client.status === 'active').map(clientMapCB)}
    </div>
  )
}

export default ClientList
