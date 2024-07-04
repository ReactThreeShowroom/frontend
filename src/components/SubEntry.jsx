const SubEntry = ({ sub }) => {
  return (
    <div className="w-full self-start">
      <p className="text-center">Hello! Sub {sub.id.slice(0, 7)}</p>
    </div>
  )
}

export default SubEntry
