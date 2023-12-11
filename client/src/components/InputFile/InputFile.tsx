interface InputProp {
  string: string
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  classNameDiv?: string
  classNameLabel?: string
  classNameInput?: string
}

export default function InputFile(props: InputProp) {
  const {
    string,
    handleFileChange,
    classNameDiv = 'relative z-0 w-full mb-5 group',
    classNameLabel = 'block mb-2 text-sm font-medium text-gray-900 ',
    classNameInput = 'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
  } = props
  return (
    <>
      <div className={classNameDiv}>
        <label className={classNameLabel} htmlFor='file_input'>
          {string}
        </label>
        <input onChange={handleFileChange} className={classNameInput} id='file_input' type='file' />
      </div>
    </>
  )
}
