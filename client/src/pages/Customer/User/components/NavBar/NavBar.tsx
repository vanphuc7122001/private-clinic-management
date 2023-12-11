import classNames from 'classnames'

interface Props {
  linkArray: {
    id: number
    name: string
  }[]
  setActive: React.Dispatch<React.SetStateAction<number>>
  active: number
}

export default function NavBar({ linkArray, setActive, active }: Props) {
  return (
    <div className='flex items-center'>
      {linkArray.map((element, index) => {
        const isActive = active === element.id
        return (
          <span
            key={index}
            onClick={(event) => setActive(element.id)}
            className={classNames(
              '  border border-blue-700  hover:opacity-75 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none',
              {
                'bg-blue-500 text-white': isActive,
                'text-blue-500 bg-red': !isActive
              }
            )}
          >
            {element.name}
          </span>
        )
      })}
    </div>
  )
}
