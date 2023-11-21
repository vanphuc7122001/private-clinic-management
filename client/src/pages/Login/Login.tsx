import logoLogin from '~/assets/images/logo-login.jpg'
import logoApp from '~/assets/images/logo-app.jpg'
export default function Login() {
  return (
    <div className='max-w-[1170px] mx-auto pt-[120px] flex'>
      <div className='w-[50%] mt-[100px]'>
        <img className='object-cover ml-[60px]' src={logoLogin} alt='Login login' width={288} height={261} />
        <p className='max-w-[412px] text-center text-gray-900 text-lg font-medium  leading-relaxed mt-[49px]'>
          High quality services, modern facilities, talented and dedicated medical team
        </p>
      </div>
      <div className='w-[50%] flex flex-col items-center'>
        <div className='h-8 flex items-center gap-2'>
          <img className='mt-[14px] rounded-[50%]' src={logoApp} alt='Logo app' width={32} height={32} />
          <div className="h-8 text-gray-900 text-[22px] font-bold font-['Gordita'] leading-loose">
            <span>Family Medical Clinic</span>
          </div>
        </div>
        <h3 className="mt-[50px] text-center text-gray-900 text-3xl font-medium font-['Gordita'] leading-10">
          Hello Again!
        </h3>
        <div className="mt-2 w-96 text-center text-zinc-400 text-base font-medium font-['Gordita'] leading-snug">
          Welcome back to sign in. As a returning customer, you have access to your previously saved all information.
        </div>

        <form>
          <div className='mb-6'>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Your email
            </label>
            <input
              type='email'
              id='email'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
              placeholder='name@flowbite.com'
              required
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Your password
            </label>
            <input
              type='password'
              id='password'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
              required
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='repeat-password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Repeat password
            </label>
            <input
              type='password'
              id='repeat-password'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
              required
            />
          </div>
          <div className='flex items-start mb-6'>
            <div className='flex items-center h-5'>
              <input
                id='terms'
                type='checkbox'
                defaultValue
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                required
              />
            </div>
            <label htmlFor='terms' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              I agree with the{' '}
              <a href='#' className='text-blue-600 hover:underline dark:text-blue-500'>
                terms and conditions
              </a>
            </label>
          </div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Register new account
          </button>
        </form>
      </div>
    </div>
  )
}
